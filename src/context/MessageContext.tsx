import { Dispatch, ReactNode, createContext, useContext, useReducer } from "react";
import { messageReducer } from "../reducers/messageReducer";
import { IMessage } from "../models/message";

export interface IMessagesState {
    messages: {
        recipientId: string; 
        list: IMessage[];
        page: number;
        pageSize: number;
        endOfList: boolean;
    }[],
    scrollToTheBottom: boolean;
}

interface IMessagesProviderProps {
    children: ReactNode;
}

interface IMessagesContextProps {
    state: IMessagesState;
    dispatch: Dispatch<MessageActionType>;
}

export type MessageActionType = SendMessageActionType | SetMessagesActionType | UpdateMessagesActionType | SetMessagesEndOfListActionType | SetMessageJustSentActionType;

export type SendMessageActionType = { type: 'SEND_MESSAGE'; payload: IMessage };
export type SetMessagesActionType = { type: 'SET_MESSAGES'; payload: {recipientId: string, list: IMessage[] }};
export type UpdateMessagesActionType = { type: 'UPDATE_MESSAGES'; payload: {recipientId: string, list: IMessage[] }};
export type SetMessagesEndOfListActionType = { type: 'SET_MESSAGES_END_OF_LIST'; payload: {recipientId: string, endOfList: boolean }};
export type SetMessageJustSentActionType = { type: 'SET_MESSAGE_JUST_SENT'; payload: boolean};

const initialMessagesState: IMessagesState = {
    messages: [],
    scrollToTheBottom: true,
};

const MessagesContext = createContext<IMessagesContextProps | undefined>(undefined);

export const MessagesProvider = ({ children }: IMessagesProviderProps) => {
    const [state, dispatch] = useReducer(messageReducer, initialMessagesState);

    return (
        <MessagesContext.Provider value={{ state, dispatch }}>
            {children}
        </MessagesContext.Provider>
    );
};

export const useMessagesContext = () => {
    return useContext(MessagesContext);
};