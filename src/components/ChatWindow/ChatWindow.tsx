import InputArea from "../InputArea/InputArea";
import MessageList from "../MessageList/MessageList";
import { useChatContext } from "../../context/ChatContext";
import styles from "./ChatWindow.module.scss";
import { useCallback } from "react";
import { sendMessage } from "../../data/messages";

const ChatWindow = () => {
  const context = useChatContext();
  if (!context) {
    throw new Error("ContactsList must be used within a ChatProvider");
  }
  const { state, dispatch } = context;

  const selectedContact = state?.contacts?.list?.find(
    (contact) => contact.id === state.selectedContactId
  );

  const sendMessageHandle = useCallback((event: any) => {    
    event.preventDefault();  
    const newMessage = sendMessage("0", state.selectedContactId!, event.target[0].value);

    dispatch({
      type: 'SEND_MESSAGE',
      payload: newMessage
    })
  }, [state.selectedContactId])

  return selectedContact !== undefined ? (
    <div className="chat-window">
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
