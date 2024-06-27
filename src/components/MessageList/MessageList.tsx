import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { IMessage, useChatContext } from "../../context/ChatContext";
import { MESSAGES } from "../../data/messages";
import Message from "../Message/Message";

const fetchMessages = (userId: string, recipientId: string): IMessage[] => {
  return MESSAGES.filter(
    (message) =>
      (message.senderId === userId && message.recipientId === recipientId) ||
      (message.senderId === recipientId && message.recipientId === userId)
  ).sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
};

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
  const [messages, setMessages] = useState<IMessage[]>([]);

  useLayoutEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    const conversationMessages = fetchMessages(userId, recipientId);
    setMessages(conversationMessages);
  }, [userId, recipientId]);

  return (
    <div className="message-list" ref={messageListRef}>
      {messages.map((message) => (
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
