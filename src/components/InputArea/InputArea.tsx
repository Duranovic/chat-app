// InputArea.tsx

import styles from './InputArea.module.scss';

const InputArea = () => (
  <div className={styles.input_area}>
    <textarea placeholder="Type your message..."></textarea>
    <button type="button">Send</button>
  </div>
);

export default InputArea;