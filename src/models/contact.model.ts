import { IMessage } from "./message.model";

export interface IContact {
    id: string;
    name: string;
    profileImage: string;
    latestMessage?: IMessage;
}