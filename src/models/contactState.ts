import { IContact } from "./contact";

export interface IContactState {
    contacts: {
      list: IContact[];
      page: number;
      pageSize: number;
      endOfList: boolean;
    };
    selectedContactId: string | undefined;
  }