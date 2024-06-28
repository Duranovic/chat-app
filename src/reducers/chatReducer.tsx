import { IContact, IState } from "../context/ChatContext";
import { compareTimestamps } from "../utils/timestampSortHelper";
import { IAction } from "./action.model";

export const chatReducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case "SET_CONTACTS":
      return {
        ...state,
        contacts: {
          ...state.contacts,
          list: [...action.payload.list],
          page: 2,
        },
      };
    case "UPDATE_CONTACTS":
      return {
        ...state,
        contacts: {
          ...state.contacts,
          page: state.contacts.page + 1,
          list: [...state.contacts.list, ...action.payload.list],
          endOfList: action.payload.endOfList,
        },
      };
    case "SET_SELECTED_CONTACT":
      return {
        ...state,
        selectedContactId: action.payload,
      };
    case "SET_MESSAGES":
      const { recipientId, list } = action.payload;
      const updatedMessages = state.messages.map((message) => {
        if (message.recipientId === recipientId) {
          return { ...message, list };
        }
        return message;
      });

      if (
        !updatedMessages.some((message) => message.recipientId === recipientId)
      ) {
        updatedMessages.push({ recipientId, list });
      }

      return {
        ...state,
        messages: updatedMessages,
      };
    case "SEND_MESSAGE":
      let newMessages = state.messages.map((message) => {
        if (message.recipientId === action.payload.recipientId) {
          return {
            ...message,
            list: [...message.list, action.payload],
          };
        }
        return message;
      });
      return {
        ...state,
        messages: newMessages,
        contacts: {
           ...state.contacts,
           list: [
            ...state.contacts.list.map(item => {
              if(item.id === action.payload.recipientId) {                
                return {
                  ...item,
                  latestMessage: action.payload
                }
              }
              return item;
            }).sort((a: IContact, b: IContact) => compareTimestamps(a.latestMessage?.timestamp, b.latestMessage?.timestamp))
           ]
        }
      };
    default:
      return state;
  }
};
