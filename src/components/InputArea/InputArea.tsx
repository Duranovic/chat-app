// InputArea.tsx

import { FormEvent, useRef } from 'react';
import styles from './InputArea.module.scss';

const InputArea = ({onMessageSubmit}: any) => {
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  const handleSumbit = (event: FormEvent)=> {
      onMessageSubmit(event);
      // Clear form fields
      if(messageInputRef.current) {
        messageInputRef.current.value = '';
      }

  }
  
  return (
  <form className={styles.input_area} onSubmit={(event)=>handleSumbit(event)}>
    <textarea placeholder="Type your message..." name='message' ref={messageInputRef}></textarea>
    <button className={styles.send_message}>
        <img src="src/assets/paper-plane-color.png" alt="Send message" />
    </button>
  </form>
)};

export default InputArea;