// ChatHeader.tsx
import { useContactContext } from '../../hooks/useContactContext';
import styles from './Header.module.scss';

const Header = () => {
    const context = useContactContext();
    if (!context) {
      throw new Error("ContactsList must be used within a ChatProvider");
    }
    const {state} = context;    
    
    const selectedContact = state.contacts.list.find(contact => contact.id === state.selectedContactId);

    return (
        <div className={styles.chat_header}>
        <img src={selectedContact?.profileImage} alt="User avatar" />
        <h2>{selectedContact?.name}</h2>
      </div>
    )
}
;

export default Header;