import InputArea from "../InputArea/InputArea";
import MessageList from "../MessageList/MessageList";
import { useContactContext } from "../../context/ContactContext";
import styles from "./ChatWindow.module.scss";
import { useCallback } from "react";
import { sendMessage } from "../../data/messages";
import { useMessagesContext } from "../../context/MessageContext";

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

  const sendMessageHandle = useCallback((event: any) => {    
    event.preventDefault();  
    const newMessage = sendMessage("0", contactContext.state.selectedContactId!, event.target[0].value);

    messagesContext?.dispatch({
      type: 'SEND_MESSAGE',
      payload: newMessage
    });

    contactContext?.dispatch({
      type: 'SET_CONTACT_LATEST_MESSAGE',
      payload: newMessage
    });
  }, [contactContext?.state.selectedContactId])

  return selectedContact !== undefined ? (
    <div className={styles.chat_window}>
      <div className={styles.chat_header}>
        <img src={selectedContact?.profileImage} alt="User avatar" />
        <h2>{selectedContact?.name}</h2>
      </div>
      <MessageList />
      <InputArea onMessageSubmit={sendMessageHandle}/>
    </div>
  ) : (
    <h2>No selected Contact!</h2>
  );
};

export default ChatWindow;
