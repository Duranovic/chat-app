import { IContact } from "./contact";
import { IMessage } from "./message";

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