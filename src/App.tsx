import "./App.scss";
import { ContactProvider } from "./context/ContactContext";
import ContactList from "./components/ContactList/ContactList";
import ChatWindow from "./components/ChatWindow/ChatWindow";
import { MessagesProvider } from "./context/MessageContext";

function App() {  
  return (
    <ContactProvider>
      <MessagesProvider>      
      <div className="chat-app">
        <ContactList />
        <ChatWindow />
      </div>
      </MessagesProvider>
    </ContactProvider>
  );
}

export default App;
