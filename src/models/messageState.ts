import { IMessage } from "./message";

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