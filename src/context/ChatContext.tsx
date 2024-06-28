import { Dispatch, ReactNode, createContext, useContext, useReducer } from "react";
import { chatReducer } from "../reducers/chatReducer";

export interface IState {
    contacts: {
        list: IContact[],
        page: number,
        pageSize: number,
        endOfList: boolean,
    },
    messages: {
        recipientId: string, 
        list: IMessage[],
        page: number,
        pageSize: number,
        endOfList: boolean,
    }[]
    selectedContactId: string | undefined;
}

export interface IMessage {
    id: string;
    text: string;
    senderId: string;
    recipientId: string;
    timestamp: string;
}

export interface IContact {
    id: string;
    name: string;
    profileImage: string;
    latestMessage?: IMessage;
}

export type ChatActionType = SetContactsActionType | UpdateContactsActionType | SetSelectedContactActionType | SendMessageActionType | SetMessagesActionType | UpdateMessagesActionType | SetMessagesEndOfListActionType;

export type SetContactsActionType = { type: 'SET_CONTACTS'; payload: { list: IContact[], endOfList: boolean } };
export type UpdateContactsActionType = { type: 'UPDATE_CONTACTS'; payload: { list: IContact[], endOfList: boolean} }
export type SetSelectedContactActionType = { type: 'SET_SELECTED_CONTACT'; payload: string };
export type SendMessageActionType = { type: 'SEND_MESSAGE'; payload: IMessage };
export type SetMessagesActionType = { type: 'SET_MESSAGES'; payload: {recipientId: string, list: IMessage[] }};
export type UpdateMessagesActionType = { type: 'UPDATE_MESSAGES'; payload: {recipientId: string, list: IMessage[] }};
export type SetMessagesEndOfListActionType = { type: 'SET_MESSAGES_END_OF_LIST'; payload: {recipientId: string, endOfList: boolean }};

interface IChatProviderProps {
    children: ReactNode;
}

interface ChatContextProps {
    state: IState;
    dispatch: Dispatch<ChatActionType>;
}

const initialState: IState = {
    contacts: {
        list: [],
        page: 1,
        pageSize: 15,
        endOfList: false,
    },
    messages: [],
    selectedContactId: undefined,
};

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider = ({ children }: IChatProviderProps) => {
    const [state, dispatch] = useReducer(chatReducer, initialState);

    return (
        <ChatContext.Provider value={{state, dispatch}}>
            {children}
        </ChatContext.Provider>
    );
};


// Custom hook for easy access to context
export const useChatContext = () => {
    return useContext(ChatContext);
};
