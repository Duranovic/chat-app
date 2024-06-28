import InputArea from "../InputArea/InputArea";
import MessageList from "../MessageList/MessageList";
import { IMessage, useChatContext } from "../../context/ChatContext";
import styles from "./ChatWindow.module.scss";
import { useCallback } from "react";

const ChatWindow = () => {
  const context = useChatContext();
  if (!context) {
    throw new Error("ContactsList must be used within a ChatProvider");
  }
  const { state, dispatch } = context;

  const selectedContact = state?.contacts?.list?.find(
    (contact) => contact.id === state.selectedContactId
  );

  const sendMessage = useCallback((event: any) => {    
    event.preventDefault();  
    console.log("CALLED SEND MESSAGE");
    dispatch({
      type: 'SEND_MESSAGE',
      payload: {
      id: '000',
      recipientId: state.selectedContactId,
      senderId: '0',
      text: event.target[0].value,
      timestamp: new Date().toISOString(),
      } as IMessage
    })
  }, [state.selectedContactId])

  return selectedContact !== undefined ? (
    <div className="chat-window">
      <div className={styles.chat_header}>
        <img src={selectedContact?.profileImage} alt="User avatar" />
        <h2>{selectedContact?.name}</h2>
      </div>
      <MessageList recipientId={selectedContact?.id} userId={"0"} />
      <InputArea onMessageSubmit={sendMessage}/>
    </div>
  ) : (
    <h2>No selected Contact!</h2>
  );
};

export default ChatWindow;
