import InputArea from "../InputArea/InputArea";
import MessageList from "../MessageList/MessageList";
import styles from "./ChatWindow.module.scss";
import { useCallback } from "react";
import { sendMessage } from "../../data/messages";
import { useContactContext } from "../../hooks/useContactContext";
import { useMessagesContext } from "../../hooks/useMessageContext";
import { EmptyList } from "../EmptyList/EmptyList";

const ChatWindow = () => {
  const contactContext = useContactContext();
  if (!contactContext) {
    throw new Error("ContactsList must be used within a ContactProvider");
  }

  const messagesContext = useMessagesContext();
  if (!messagesContext) {
    throw new Error("ContactsList must be used within a MessagesProvider");
  }

  const selectedContact = contactContext.state?.contacts?.list?.find(
    (contact) => contact.id === contactContext.state.selectedContactId
  );

  const sendMessageHandle = useCallback(
    (value: string) => {
      const newMessage = sendMessage(
        "0",
        contactContext.state.selectedContactId!,
        value
      );

      messagesContext?.dispatch({
        type: "SEND_MESSAGE",
        payload: newMessage,
      });

      contactContext?.dispatch({
        type: "SET_CONTACT_LATEST_MESSAGE",
        payload: newMessage,
      });
    },
    [contactContext, messagesContext]
  );

  return selectedContact !== undefined ? (
    <div className={styles.chat_window}>
      <div className={styles.chat_header}>
        <img src={selectedContact?.profileImage} alt="User avatar" />
        <h2>{selectedContact?.name}</h2>
      </div>
      <MessageList />
      <InputArea onMessageSubmit={sendMessageHandle} />
    </div>
  ) : (
    <EmptyList
      image="src/assets/phone.png"
      title="Contact is not selected!"
      desscription="Select a contact from the left side panel to start chatting"
    />
  );
};

export default ChatWindow;
