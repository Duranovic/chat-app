// InputArea.tsx

import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './InputArea.module.scss';

export interface InputAreaProps {
  onMessageSubmit: (value: string)=>void;
}

export const InputArea = ({onMessageSubmit}: InputAreaProps) => {
  const [value, setValue] = useState('');

  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }

  const handleSumbit = (event: FormEvent)=> {
      event.preventDefault();
      onMessageSubmit(value);
      setValue('');
  }
  
  return (
  <form className={styles.input_area} onSubmit={(event)=>handleSumbit(event)}>
    <input placeholder="Type your message..." name='message' value={value} onChange={handleValueChange}></input>
    <button className={styles.send_message} disabled={value === ''}>
        <img src="src/assets/paper-plane-color.png" alt="Send message" />
    </button>
  </form>
)};

export default InputArea;