// ContactItem.tsx
import styles from './ContactItem.module.scss';

interface ContactItemProps {
  imgSrc: string;
  name: string;
  lastMessage: string;
}

const ContactItem = ({ imgSrc, name, lastMessage }: ContactItemProps) => (
  <div className={styles.contact_item}>
    <img src={imgSrc} alt="Profile Picture" />
    <div className={styles.contact_info}>
      <h3>{name}</h3>
      <p>{lastMessage}</p>
    </div>
  </div>
);

export default ContactItem;