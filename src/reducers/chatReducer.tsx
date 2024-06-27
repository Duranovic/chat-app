import { IState } from "../context/ChatContext";
import { IAction } from "./action.model";

export const chatReducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case "SET_CONTACTS":
      return {
        ...state,
        contacts: {
            ...state.contacts,
            list: [...action.payload.list],
            page: 2
        },
      };
    case "UPDATE_CONTACTS":
      return {
        ...state,
        contacts: {
            ...state.contacts,
            page: state.contacts.page + 1,
            list: [
                ...state.contacts.list,
                ...action.payload.list
            ],
            endOfList: action.payload.endOfList,
        },
      };
    case "SET_SELECTED_CONTACT":
      return {
        ...state,        
        selectedContactId: action.payload,
      };
    default:
      return state;
  }
};
