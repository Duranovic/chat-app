import InputArea from "../InputArea/InputArea";
import MessageList from "../MessageList/MessageList";
import { useChatContext } from "../../context/ChatContext";
import styles from "./ChatWindow.module.scss";

const ChatWindow = () => {
  const context = useChatContext();
  if (!context) {
    throw new Error("ContactsList must be used within a ChatProvider");
  }
  const { state } = context;

  const selectedContact = state?.contacts?.list?.find(
    (contact) => contact.id === state.selectedContactId
  );

  return selectedContact !== undefined ? (
    <div className="chat-window">
      <div className={styles.chat_header}>
        <img src={selectedContact?.profileImage} alt="User avatar" />
        <h2>{selectedContact?.name}</h2>
      </div>
      <MessageList recipientId={selectedContact?.id} userId={"0"} />
      <InputArea />
    </div>
  ) : (
    <h2>No selected Contact!</h2>
  );
};

export default ChatWindow;
