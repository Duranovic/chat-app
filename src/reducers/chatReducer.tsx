import { IContact, IState } from "../context/ChatContext";
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

    case "SET_MESSAGES":
    case "UPDATE_MESSAGES": {
      const { recipientId, list } = action.payload;
      const messageIndex = state.messages.findIndex(
        (m) => m.recipientId === recipientId
      );

      if (messageIndex === -1) {
        const newMessage = {
          recipientId,
          list,
          page: 1,
          pageSize: 10,
          endOfList: list.length < 10,
        };

        return { ...state, messages: [...state.messages, newMessage] };
      }

      const updatedMessage = {
        ...state.messages[messageIndex],
        list:
          action.type === "SET_MESSAGES"
            ? list
            : [...list, ...state.messages[messageIndex].list],
        page: state.messages[messageIndex].page + 1,
        endOfList:
          action.type === "SET_MESSAGES"
            ? list.length < state.messages[messageIndex].pageSize
            : list.length === 0,
      };

      return {
        ...state,
        messages: [
          ...state.messages.slice(0, messageIndex),
          updatedMessage,
          ...state.messages.slice(messageIndex + 1),
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
        messages: state.messages.map((message) =>
          message.recipientId === action.payload.recipientId
            ? { ...message, list: [...message.list, action.payload] }
            : message
        ),
        contacts: { ...state.contacts, list: updatedContacts },
      };
    }

    default:
      return state;
  }
};
