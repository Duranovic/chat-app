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

interface MessageListProps {
  userId: string;
  recipientId: string;
}

const MessageList = ({ userId, recipientId }: MessageListProps) => {
  const context = useChatContext();
  if (!context) {
    throw new Error("ContactsList must be used within a ChatProvider");
  }
  const messageListRef = useRef<HTMLDivElement>(null);
  const {state, dispatch} = context;

  const messagesToShow = state.messages.find(item => item.recipientId === state.selectedContactId || item.recipientId === userId)?.list;

  const loadFnc = useCallback(()=>{
    console.log(state);
    // Load initial messages
    const findRecipient = state.messages.find(item=>item.recipientId === recipientId);
    if(findRecipient && !findRecipient.endOfList) {
      fetchMessages(userId, recipientId, findRecipient?.page, findRecipient?.pageSize).then((messages)=>{   
        dispatch({
          type: 'UPDATE_MESSAGES',
          payload: {
            recipientId: recipientId,
            list: messages,
          },
        })
      });
    }
    
  }, [state.messages])

  useScrollToEnd(messageListRef, SCROLL_ANCHOR.TOP, loadFnc);

  useLayoutEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messagesToShow]);

  useEffect(() => {
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
    
  }, [state.messages, userId, recipientId]);

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
