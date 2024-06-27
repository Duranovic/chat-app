// ContactItem.tsx
import styles from './ContactItem.module.scss';

interface ContactItemProps {
  imgSrc: string;
  name: string;
  lastMessage?: string;
  onItemSelected: ()=>void
}

const ContactItem = ({ imgSrc, name, lastMessage, onItemSelected }: ContactItemProps) => (
  <button className={styles.contact_item} onClick={onItemSelected}>
    <img src={imgSrc} alt="Profile Picture" />
    <div className={styles.contact_info}>
      <h3>{name}</h3>
      {lastMessage ? <p>{lastMessage}</p> : undefined}
    </div>
  </button>
);

export default ContactItem;