// InputArea.tsx

import styles from './InputArea.module.scss';

const InputArea = () => (
  <div className={styles.input_area}>
    <textarea placeholder="Type your message..."></textarea>
    <button className={styles.send_message}>
        <img src="src/assets/paper-plane-color.png" alt="Send message" />
    </button>
  </div>
);

export default InputArea;