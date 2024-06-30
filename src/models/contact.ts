import { IMessage } from "./message";

export interface IContact {
    id: string;
    name: string;
    profileImage: string;
    latestMessage?: IMessage;
}