import "./App.scss";
import { ChatProvider } from "./context/ChatContext";
import ContactList from "./components/ContactList/ContactList";
import ChatWindow from "./components/ChatWindow/ChatWindow";

function App() {  
  return (
    <ChatProvider>
      <div className="chat-app">
        <ContactList />
        <ChatWindow />
      </div>
    </ChatProvider>
  );
}

export default App;
