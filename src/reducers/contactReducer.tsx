import { IContactState } from "../context/ContactContext";
import { IAction } from "../models/action";
import { IContact } from "../models/contact";
import { compareTimestamps } from "../utils/timestampSortHelper";

export const contactReducer = (state: IContactState, action: IAction) => {
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
    case "SET_SELECTED_CONTACT": {
      return { ...state, selectedContactId: action.payload };
    }
    case "SET_CONTACT_LATEST_MESSAGE": {
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
        contacts: { ...state.contacts, list: updatedContacts },
      };
    }
    default:
      return state;
  }
};
