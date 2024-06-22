import "./App.scss";

function App() {
  return (
    <>
      <div className="chat-app">
        <div className="contact-list">
          <div className="contact-item">
            <img src="src/assets/person-1.jpeg" alt="Profile Picture" />
            <div className="contact-info">
              <h3>John Doe</h3>
              <p>Last message...</p>
            </div>
          </div>

          <div className="contact-item">
            <img src="src/assets/person-2.jpeg" alt="Profile Picture" />
            <div className="contact-info">
              <h3>John Doe</h3>
              <p>Last message...</p>
            </div>
          </div>

          <div className="contact-item">
            <img src="src/assets/person-3.jpeg" alt="Profile Picture" />
            <div className="contact-info">
              <h3>John Doe</h3>
              <p>Last message...</p>
            </div>
          </div>

          <div className="contact-item">
            <img src="src/assets/person-11.jpeg" alt="Profile Picture" />
            <div className="contact-info">
              <h3>John Doe</h3>
              <p>Last message...</p>
            </div>
          </div>
        </div>
        <div className="chat-window">
          <div className="chat-header">
            <img src="src/assets/person-1.jpeg" alt="User avatar" />
            <h2>John Doe</h2>
          </div>

          <div className="message-list">
            <div className="message sent">
              <div className="message-bubble">
                <span className="message-content">
                  Hey there! How's it going?
                </span>
                <span className="message-timestamp">10:32 AM</span>
              </div>
            </div>
            <div className="message received">
              <div className="message-bubble">
                <span className="message-content">
                  Hi! I'm doing well, thanks for asking. How about you?
                </span>
                <span className="message-timestamp">10:35 AM</span>
              </div>
            </div>
            <div className="message sent">
              <div className="message-bubble">
                <span className="message-content">
                  Hey there! How's it going?
                </span>
                <span className="message-timestamp">10:32 AM</span>
              </div>
            </div>
            <div className="message received">
              <div className="message-bubble">
                <span className="message-content">
                  Hi! I'm doing well, thanks for asking. How about you?
                </span>
                <span className="message-timestamp">10:35 AM</span>
              </div>
            </div>
            <div className="message sent">
              <div className="message-bubble">
                <span className="message-content">
                  Hey there! How's it going?
                </span>
                <span className="message-timestamp">10:32 AM</span>
              </div>
            </div>
            <div className="message received">
              <div className="message-bubble">
                <span className="message-content">
                  Hi! I'm doing well, thanks for asking. How about you?
                </span>
                <span className="message-timestamp">10:35 AM</span>
              </div>
            </div>
            <div className="message sent">
              <div className="message-bubble">
                <span className="message-content">
                  Hey there! How's it going?
                </span>
                <span className="message-timestamp">10:32 AM</span>
              </div>
            </div>
            <div className="message received">
              <div className="message-bubble">
                <span className="message-content">
                  Hi! I'm doing well, thanks for asking. How about you?
                </span>
                <span className="message-timestamp">10:35 AM</span>
              </div>
            </div>
            <div className="message sent">
              <div className="message-bubble">
                <span className="message-content">
                  Hey there! How's it going?
                </span>
                <span className="message-timestamp">10:32 AM</span>
              </div>
            </div>
            <div className="message received">
              <div className="message-bubble">
                <span className="message-content">
                  Hi! I'm doing well, thanks for asking. How about you?
                </span>
                <span className="message-timestamp">10:35 AM</span>
              </div>
            </div>
            <div className="message sent">
              <div className="message-bubble">
                <span className="message-content">
                  Hey there! How's it going?
                </span>
                <span className="message-timestamp">10:32 AM</span>
              </div>
            </div>
            <div className="message received">
              <div className="message-bubble">
                <span className="message-content">
                  Hi! I'm doing well, thanks for asking. How about you?
                </span>
                <span className="message-timestamp">10:35 AM</span>
              </div>
            </div>
            <div className="message sent">
              <div className="message-bubble">
                <span className="message-content">
                  Hey there! How's it going?
                </span>
                <span className="message-timestamp">10:32 AM</span>
              </div>
            </div>
            <div className="message received">
              <div className="message-bubble">
                <span className="message-content">
                  Hi! I'm doing well, thanks for asking. How about you?
                </span>
                <span className="message-timestamp">10:35 AM</span>
              </div>
            </div>
            <div className="message sent">
              <div className="message-bubble">
                <span className="message-content">
                  Hey there! How's it going?
                </span>
                <span className="message-timestamp">10:32 AM</span>
              </div>
            </div>
            <div className="message received">
              <div className="message-bubble">
                <span className="message-content">
                  Hi! I'm doing well, thanks for asking. How about you?
                </span>
                <span className="message-timestamp">10:35 AM</span>
              </div>
            </div>
            <div className="message sent">
              <div className="message-bubble">
                <span className="message-content">
                  Hey there! How's it going?
                </span>
                <span className="message-timestamp">10:32 AM</span>
              </div>
            </div>
            <div className="message received">
              <div className="message-bubble">
                <span className="message-content">
                  Hi! I'm doing well, thanks for asking. How about you?
                </span>
                <span className="message-timestamp">10:35 AM</span>
              </div>
            </div>
            <div className="message sent">
              <div className="message-bubble">
                <span className="message-content">
                  Hey there! How's it going?
                </span>
                <span className="message-timestamp">10:32 AM</span>
              </div>
            </div>
            <div className="message received">
              <div className="message-bubble">
                <span className="message-content">
                  Hi! I'm doing well, thanks for asking. How about you?
                </span>
                <span className="message-timestamp">10:35 AM</span>
              </div>
            </div>
          </div>

          <div className="input-area">
            <textarea placeholder="Type your message..."></textarea>
            <button type="button">Send</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
