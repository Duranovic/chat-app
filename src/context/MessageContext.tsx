import { Dispatch, ReactNode, createContext, useReducer } from "react";
import { messageReducer } from "../reducers/messageReducer/messageReducer";
import { MessageActionType } from "../models/messageAction";
import { IMessagesState } from "../models/messageState";

interface IMessagesProviderProps {
    children: ReactNode;
}

export interface IMessagesContextProps {
    state: IMessagesState;
    dispatch: Dispatch<MessageActionType>;
}

const initialMessagesState: IMessagesState = {
    messages: [],
    scrollToTheBottom: true,
};

export const MessagesContext = createContext<IMessagesContextProps | undefined>(undefined);

export const MessagesProvider = ({ children }: IMessagesProviderProps) => {
    const [state, dispatch] = useReducer(messageReducer, initialMessagesState);

    return (
        <MessagesContext.Provider value={{ state, dispatch }}>
            {children}
        </MessagesContext.Provider>
    );
};