// Message.tsx
import styles from './Message.module.scss';

interface MessageProps {
  sent: boolean;
  content: string;
  timestamp: string;
}

const Message = ({ sent, content, timestamp }: MessageProps) => (
  <div className={`${styles.message} ${sent ? styles.sent : styles.received}`}>
    <div className={styles.message_bubble}>
      <span className={styles.message_content}>{content}</span>
      <span className={styles.message_timestamp}>{timestamp}</span>
    </div>
  </div>
);

export default Message;