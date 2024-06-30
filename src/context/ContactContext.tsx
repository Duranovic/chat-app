import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from "react";
import { contactReducer } from "../reducers/contactReducer";
import { IContact } from "../models/contact";
import { IMessage } from "../models/message";

export interface IContactState {
  contacts: {
    list: IContact[];
    page: number;
    pageSize: number;
    endOfList: boolean;
  };
  selectedContactId: string | undefined;
}

export type ContactActionType =
  | SetContactsActionType
  | UpdateContactsActionType
  | SetSelectedContactActionType
  | SetLatestMessageActionType;

export type SetContactsActionType = {
  type: "SET_CONTACTS";
  payload: { list: IContact[]; endOfList: boolean };
};
export type UpdateContactsActionType = {
  type: "UPDATE_CONTACTS";
  payload: { list: IContact[]; endOfList: boolean };
};
export type SetSelectedContactActionType = {
  type: "SET_SELECTED_CONTACT";
  payload: string;
};
export type SetLatestMessageActionType = {
  type: "SET_CONTACT_LATEST_MESSAGE";
  payload: IMessage;
};

interface IContactProviderProps {
  children: ReactNode;
}

interface ContactContextProps {
  state: IContactState;
  dispatch: Dispatch<ContactActionType>;
}

const initialState: IContactState = {
  contacts: {
    list: [],
    page: 1,
    pageSize: 15,
    endOfList: false,
  },
  selectedContactId: undefined,
};

const ContactContext = createContext<ContactContextProps | undefined>(
  undefined
);

export const ContactProvider = ({ children }: IContactProviderProps) => {
  const [state, dispatch] = useReducer(contactReducer, initialState);

  return (
    <ContactContext.Provider value={{ state, dispatch }}>
      {children}
    </ContactContext.Provider>
  );
};

// Custom hook for easy access to context
export const useContactContext = () => {
  return useContext(ContactContext);
};
