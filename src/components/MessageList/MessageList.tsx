import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { useChatContext } from "../../context/ChatContext";
import Message from "../Message/Message";
import { fetchMessages } from "../../data/messages";
import { useScrollToEnd } from "../../hooks/useScrollToEnd";
import { SCROLL_ANCHOR } from "../../utils/constants";

const MessageList = () => {
  console.log('%c RENDER MESSAGE LIST!', 'background: orange; color: white');
  const context = useChatContext();
  if (!context) {
    throw new Error("ContactsList must be used within a ChatProvider");
  }
  const messageListRef = useRef<HTMLDivElement>(null);
  const {state, dispatch} = context;

  const recipientId = state.selectedContactId ?? "1";
  const userId = "0";
  const messagesToShow = state.messages.find(item => item.recipientId === state.selectedContactId || item.recipientId === userId)?.list ?? [];
  const foundRecipient = state.messages.find(item=>item.recipientId === recipientId);

  const loadMoreMessages = useCallback(()=>{
    if(foundRecipient && !foundRecipient.endOfList) {
      console.log('%c LOAD MORE MESSAGES! ' + foundRecipient?.page, 'background: red; color: white');
      fetchMessages(userId, recipientId, foundRecipient?.page, foundRecipient?.pageSize).then((messages)=>{           
        dispatch({
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
    if (messageListRef.current && state.scrollToTheBottom) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messagesToShow, state.scrollToTheBottom, recipientId]);

  useEffect(() => {
    // If contact is found in the state, do not load initial messages again
    if(state.messages.find(item => item.recipientId === recipientId)) {
      return;
    }
    // Load initial messages
    fetchMessages(userId, recipientId, 1, 10).then((messages)=>{
      dispatch({
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
    <div className="message-list" ref={messageListRef}>
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
