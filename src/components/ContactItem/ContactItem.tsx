// ContactItem.tsx
import styles from './ContactItem.module.scss';

interface ContactItemProps {
  name: string;
  imgSrc?: string;
  lastMessage?: string;
  active: boolean;
  onItemSelected: ()=>void;
}

const ContactItem = ({ imgSrc, name, lastMessage, active, onItemSelected }: ContactItemProps) => {
  const classes = [styles.contact_item, active && styles.selected].filter(Boolean).join(' ');

  return (<button className={classes} onClick={onItemSelected}>
    <img src={imgSrc} alt="Profile Picture" />
    <div className={styles.contact_info}>
      <h3>{name}</h3>
      {lastMessage ? <p>{lastMessage}</p> : undefined}
    </div>
  </button>
)};

export default ContactItem;