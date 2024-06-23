import "./App.scss";
import ContactItem from "./components/ContactItem/ContactItem";
import Header from "./components/Header/Header";
import InputArea from "./components/InputArea/InputArea";
import Message from "./components/Message/Message";

function App() {
  return (
    <>
      <div className="chat-app">
        <div className="contact-list">
          <ContactItem
            imgSrc="src/assets/person-1.jpeg"
            name="John Doe"
            lastMessage="Last message..."
            key="1"
          />
          <ContactItem
            imgSrc="src/assets/person-2.jpeg"
            name="John Doe"
            lastMessage="Last message..."
            key="2"
          />
          <ContactItem
            imgSrc="src/assets/person-11.jpeg"
            name="John Doe"
            lastMessage="Last message..."
            key="3"
          />
          <ContactItem
            imgSrc="src/assets/person-12.jpeg"
            name="John Doe"
            lastMessage="Last message..."
            key="4"
          />
        </div>
        <div className="chat-window">
          <Header imgSrc="src/assets/person-1.jpeg" name="John Doe" />
          <div className="message-list">
            <Message sent={true} content="Hey there! How's it going?" timestamp="10:32 AM" />
            <Message sent={false} content="Hey there! How's it going?" timestamp="10:32 AM" />
            <Message sent={true} content="Hey there! How's it going?" timestamp="10:32 AM" />
            <Message sent={false} content="Hey there! How's it going?" timestamp="10:32 AM" />
            <Message sent={true} content="Hey there! How's it going?" timestamp="10:32 AM" />
            <Message sent={false} content="Hey there! How's it going?" timestamp="10:32 AM" />
            <Message sent={true} content="Hey there! How's it going?" timestamp="10:32 AM" />
            <Message sent={false} content="Hey there! How's it going?" timestamp="10:32 AM" />
            <Message sent={true} content="Hey there! How's it going?" timestamp="10:32 AM" />
            <Message sent={false} content="Hey there! How's it going?" timestamp="10:32 AM" />
            <Message sent={true} content="Hey there! How's it going?" timestamp="10:32 AM" />
            <Message sent={false} content="Hey there! How's it going?" timestamp="10:32 AM" />
          </div>
          <InputArea />
        </div>
      </div>
    </>
  );
}

export default App;
