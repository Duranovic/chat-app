import { IState } from "../context/ChatContext";
import { IContact } from "../models/contact.model";
import { compareTimestamps } from "../utils/timestampSortHelper";
import { IAction } from "./action.model";

export const chatReducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case "SET_CONTACTS":
    case "UPDATE_CONTACTS": {
      const { list, endOfList } = action.payload;
      const newPage =
        action.type === "SET_CONTACTS" ? 2 : state.contacts.page + 1;
      return {
        ...state,
        contacts: {
          ...state.contacts,
          list:
            action.type === "SET_CONTACTS"
              ? list
              : [...state.contacts.list, ...list],
          page: newPage,
          endOfList,
        },
      };
    }
    case "SET_SELECTED_CONTACT":
      return { ...state, selectedContactId: action.payload };

      case "SET_MESSAGES": {
        const { recipientId, list } = action.payload;
        const messageIndex = state.messages.findIndex(m => m.recipientId === recipientId);
      
        if (messageIndex !== -1) {
          // If messages for this recipient already exist, it's not a SET action, so return the state unchanged
          return state;
        }
      
        const newMessage = {
          recipientId,
          list,
          page: 2, // Assuming you want to start at page 2 for subsequent loads
          pageSize: 10, 
          endOfList: list.length < 10,
        };
      
        return { 
          ...state, 
          scrollToTheBottom: true,
          messages: [...state.messages, newMessage] };
      }
      
      case "UPDATE_MESSAGES": {
        const { recipientId, list } = action.payload;
        const messageIndex = state.messages.findIndex(m => m.recipientId === recipientId);
      
        if (messageIndex === -1) {          
          // If messages for this recipient don't exist yet, handle the error
          // You could throw an error, log a warning, or create a new message object
          throw new Error(`Recipient ${recipientId} not found in messages state`);
        }
      
        const updatedMessage = {
          ...state.messages[messageIndex],
          scrollToTheBottom: false,
          list: [...list, ...state.messages[messageIndex].list],
          page: state.messages[messageIndex].page + 1,
          endOfList: list.length === 0, // Check if there are no more messages to load
        };
      
        return {
          ...state,
          scrollToTheBottom: false,
          messages: [
            ...state.messages.slice(0, messageIndex),
            updatedMessage,
            ...state.messages.slice(messageIndex + 1)
          ],
        };
      }

    case "SEND_MESSAGE": {
      const updatedContacts = state.contacts.list
        .map((item) =>
          item.id === action.payload.recipientId
            ? { ...item, latestMessage: action.payload }
            : item
        )
        .sort((a: IContact, b: IContact) =>
          compareTimestamps(
            a.latestMessage?.timestamp,
            b.latestMessage?.timestamp
          )
        );

      return {
        ...state,
        scrollToTheBottom: true,
        messages: state.messages.map((message) =>
          message.recipientId === action.payload.recipientId
            ? { ...message, list: [...message.list, action.payload] }
            : message
        ),
        contacts: { ...state.contacts, list: updatedContacts },
      };
    } 

    case "SET_MESSAGE_JUST_SENT": 
      return {
        ...state,
        justSent: action.payload
      }

    default:
      return state;
  }
};
