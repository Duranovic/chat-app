import {
  Dispatch,
  ReactNode,
  createContext,
  useReducer,
} from "react";
import { contactReducer } from "../reducers/contactReducer/contactReducer";
import { IContactState } from "../models/contactState";
import { ContactActionType } from "../models/contactAction";

interface IContactProviderProps {
  children: ReactNode;
}

export interface ContactContextProps {
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

export const ContactContext = createContext<ContactContextProps | undefined>(
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
