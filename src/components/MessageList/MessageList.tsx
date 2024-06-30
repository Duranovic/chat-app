import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { useContactContext } from "../../context/ContactContext";
import Message from "../Message/Message";
import { fetchMessages } from "../../data/messages";
import { useScrollToEnd } from "../../hooks/useScrollToEnd";
import { SCROLL_ANCHOR } from "../../utils/constants";
import { useMessagesContext } from "../../context/MessageContext";
import styles from './MessageList.module.scss';

const MessageList = () => {
  const contactContext = useContactContext();
  const messagesContext = useMessagesContext();

  console.log("RENDER MESSAGE");

  if (!contactContext) {
    throw new Error("MessageList must be used within a ContactProvider");
  }

  if (!messagesContext) {
    throw new Error("MessageList must be used within a ChatProvider");
  }

  const userId = "0";
  const messageListRef = useRef<HTMLDivElement>(null);  
  const recipientId = contactContext.state.selectedContactId ?? "1";
  const messagesToShow = messagesContext.state.messages.find(item => item.recipientId === contactContext.state.selectedContactId || item.recipientId === userId)?.list ?? [];
  const foundRecipient = messagesContext.state.messages.find(item=>item.recipientId === recipientId);

  const loadMoreMessages = useCallback(()=>{
    if(foundRecipient && !foundRecipient.endOfList) {
      fetchMessages(userId, recipientId, foundRecipient?.page, foundRecipient?.pageSize).then((messages)=>{           
        messagesContext.dispatch({
          type: 'UPDATE_MESSAGES',
          payload: {
            recipientId: recipientId,
            list: messages,
          },
        })
      });
    }
  }, [foundRecipient])

  useLayoutEffect(() => {    
    if (messageListRef.current && messagesContext.state.scrollToTheBottom) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messagesToShow, messagesContext.state.scrollToTheBottom, recipientId]);

  useEffect(() => {
    // If contact is found in the state, do not load initial messages again
    if(messagesContext.state.messages.find(item => item.recipientId === recipientId)) {
      return;
    }
    // Load initial messages
    fetchMessages(userId, recipientId, 1, 10).then((messages)=>{
      messagesContext.dispatch({
        type: 'SET_MESSAGES',
        payload: {
          recipientId: recipientId,
          list: messages,
        },
      })
    });
    
  }, [recipientId]);

  useScrollToEnd(messageListRef, SCROLL_ANCHOR.TOP, loadMoreMessages);

  return (
    <div className={styles.message_list} ref={messageListRef}>
      {messagesToShow?.map((message) => (
        <Message
          key={message.id}
          sent={userId === message.senderId}
          content={message.text}
          timestamp={message.timestamp}
        />
      ))}
    </div>
  );
};

export default MessageList;
