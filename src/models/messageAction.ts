import { IMessage } from "./message";

export type MessageActionType = SendMessageActionType | SetMessagesActionType | UpdateMessagesActionType | SetMessagesEndOfListActionType;

export type SendMessageActionType = { type: 'SEND_MESSAGE'; payload: IMessage };
export type SetMessagesActionType = { type: 'SET_MESSAGES'; payload: {recipientId: string, list: IMessage[] }};
export type UpdateMessagesActionType = { type: 'UPDATE_MESSAGES'; payload: {recipientId: string, list: IMessage[] }};
export type SetMessagesEndOfListActionType = { type: 'SET_MESSAGES_END_OF_LIST'; payload: {recipientId: string, endOfList: boolean }};