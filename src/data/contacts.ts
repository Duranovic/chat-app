import { IContact, IMessage } from "../context/ChatContext";
import { MESSAGES } from "./messages";

export const CONTACTS: IContact[] = [
    { id: '1', name: 'Alice', profileImage: 'src/assets/person-11.jpeg' },
    { id: '2', name: 'Bob', profileImage: 'src/assets/person-2.jpeg' },
    { id: '3', name: 'Charlie', profileImage: 'src/assets/person-3.jpeg' },
    { id: '4', name: 'David', profileImage: 'src/assets/person-4.jpeg' },
    { id: '5', name: 'Eve', profileImage: 'src/assets/person-2.jpeg' },
    { id: '6', name: 'Frank', profileImage: 'src/assets/person-4.jpeg' },
    { id: '7', name: 'Grace', profileImage: 'src/assets/person-3.jpeg' },
    { id: '8', name: 'Hannah', profileImage: 'src/assets/person-11.jpeg' },
    { id: '9', name: 'Isaac', profileImage: 'src/assets/person-2.jpeg' },
    { id: '10', name: 'Jack', profileImage: 'src/assets/person-3.jpeg' },
    { id: '11', name: 'Kate', profileImage: 'src/assets/person-4.jpeg' },
    { id: '12', name: 'Liam', profileImage: 'src/assets/person-2.jpeg' },
    { id: '13', name: 'Mia', profileImage: 'src/assets/person-4.jpeg' },
    { id: '14', name: 'Noah', profileImage: 'src/assets/person-3.jpeg' },
    { id: '15', name: 'Olivia', profileImage: 'src/assets/person-11.jpeg' },
    { id: '16', name: 'Peter', profileImage: 'src/assets/person-2.jpeg' },
    { id: '17', name: 'Quinn', profileImage: 'src/assets/person-3.jpeg' },
    { id: '18', name: 'Ryan', profileImage: 'src/assets/person-4.jpeg' },
    { id: '19', name: 'Sophia', profileImage: 'src/assets/person-2.jpeg' },
    { id: '20', name: 'Thomas', profileImage: 'src/assets/person-4.jpeg' },
    { id: '21', name: 'Uma', profileImage: 'src/assets/person-3.jpeg' },
    { id: '22', name: 'Violet', profileImage: 'src/assets/person-11.jpeg' },
    { id: '23', name: 'William', profileImage: 'src/assets/person-2.jpeg' },
    { id: '24', name: 'Xavier', profileImage: 'src/assets/person-3.jpeg' },
    { id: '25', name: 'Yara', profileImage: 'src/assets/person-4.jpeg' },
    { id: '26', name: 'Zoe', profileImage: 'src/assets/person-2.jpeg' },
    { id: '27', name: 'Adam', profileImage: 'src/assets/person-11.jpeg' },
    { id: '28', name: 'Ben', profileImage: 'src/assets/person-2.jpeg' },
    { id: '29', name: 'Catherine', profileImage: 'src/assets/person-3.jpeg' },
    { id: '30', name: 'Daniel', profileImage: 'src/assets/person-4.jpeg' },
    { id: '31', name: 'Emily', profileImage: 'src/assets/person-2.jpeg' },
    { id: '32', name: 'Fiona', profileImage: 'src/assets/person-4.jpeg' },
    { id: '33', name: 'George', profileImage: 'src/assets/person-3.jpeg' },
    { id: '34', name: 'Holly', profileImage: 'src/assets/person-11.jpeg' },
    { id: '35', name: 'Ian', profileImage: 'src/assets/person-2.jpeg' },
    { id: '36', name: 'Julia', profileImage: 'src/assets/person-3.jpeg' },
    { id: '37', name: 'Kevin', profileImage: 'src/assets/person-4.jpeg' },
    { id: '38', name: 'Lily', profileImage: 'src/assets/person-2.jpeg' },
    { id: '39', name: 'Michael', profileImage: 'src/assets/person-4.jpeg' },
    { id: '40', name: 'Nora', profileImage: 'src/assets/person-3.jpeg' },
    { id: '41', name: 'Oscar', profileImage: 'src/assets/person-11.jpeg' },
    { id: '42', name: 'Penny', profileImage: 'src/assets/person-2.jpeg' },
    { id: '43', name: 'Quincy', profileImage: 'src/assets/person-3.jpeg' },
    { id: '44', name: 'Rachel', profileImage: 'src/assets/person-4.jpeg' },
    { id: '45', name: 'Sam', profileImage: 'src/assets/person-2.jpeg' },
    { id: '46', name: 'Tina', profileImage: 'src/assets/person-4.jpeg' },
    { id: '47', name: 'Victor', profileImage: 'src/assets/person-3.jpeg' },
    { id: '48', name: 'Wendy', profileImage: 'src/assets/person-11.jpeg' },
    { id: '49', name: 'Xander', profileImage: 'src/assets/person-2.jpeg' },
    { id: '50', name: 'Yvonne', profileImage: 'src/assets/person-3.jpeg' },
] as IContact[];

// Function to find the latest message for a specific contact
function getLatestMessageForContact(contactId: string): IMessage | undefined {
    const messagesForContact = MESSAGES.filter(message =>
        message.senderId === contactId || message.recipientId === contactId
    );

    if (messagesForContact.length === 0) {
        return undefined; 
    }

    return messagesForContact.reduce((latest, current) => {
        return new Date(latest.timestamp) > new Date(current.timestamp) ? latest : current;
    });
}

export const fetchContacts = (page: number, pageSize: number): Promise<IContact[]> => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const contactsWithLatestMessage: IContact[] = CONTACTS.slice(startIndex, endIndex).map((contact: IContact) => {
        const latestMessage = getLatestMessageForContact(contact.id);
        return { 
            ...contact, 
            latestMessage: latestMessage 
        };
    });

    return Promise.resolve(contactsWithLatestMessage);
};