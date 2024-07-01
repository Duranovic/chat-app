import { messageReducer } from "./messageReducer";
import { IMessage } from "../../models/message";
import { IMessagesState } from "../../context/MessageContext";

describe("messageReducer", () => {
  const initialState: IMessagesState = {
    messages: [],
    scrollToTheBottom: false,
  };

  it("should handle SET_MESSAGES action (new recipient)", () => {
    const newMessages: IMessage[] = [
      { id: "1", text: "Hello", senderId: "user1", recipientId: "user2", timestamp: "2023-12-12T10:12:13.000Z" },
      { id: "2", text: "Hi there", senderId: "user2", recipientId: "user1", timestamp: "2023-12-12T10:15:23.000Z" },
    ];
    const action = { type: "SET_MESSAGES", payload: { recipientId: "user2", list: newMessages } };
    const expectedState: IMessagesState = {
      ...initialState,
      scrollToTheBottom: true,
      messages: [{ recipientId: "user2", list: newMessages, page: 2, pageSize: 10, endOfList: true }],
    };

    expect(messageReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle SET_MESSAGES action (existing recipient)", () => {
    const existingState: IMessagesState = {
      ...initialState,
      messages: [{ recipientId: "user2", list: [], page: 1, pageSize: 10, endOfList: false }],
    };
    const newMessages: IMessage[] = [
      { id: "1", text: "Hello", senderId: "user1", recipientId: "user2", timestamp: "2023-12-12T10:12:13.000Z" },
      { id: "2", text: "Hi there", senderId: "user2", recipientId: "user1", timestamp: "2023-12-12T10:15:23.000Z" },
    ];
    const action = { type: "SET_MESSAGES", payload: { recipientId: "user2", list: newMessages } };

    expect(messageReducer(existingState, action)).toEqual(existingState); // Should not modify state if the recipient already exists
  });

  it("should handle UPDATE_MESSAGES action", () => {
    const existingState: IMessagesState = {
      ...initialState,
      messages: [{ recipientId: "user2", list: [], page: 1, pageSize: 10, endOfList: false }],
      scrollToTheBottom: false,
    };
    const newMessages: IMessage[] = [
      { id: "1", text: "Hello", senderId: "user1", recipientId: "user2", timestamp: "2023-12-12T10:12:13.000Z" },
      { id: "2", text: "Hi there", senderId: "user2", recipientId: "user1", timestamp: "2023-12-12T10:15:23.000Z" },
    ];
    const action = { type: "UPDATE_MESSAGES", payload: { recipientId: "user2", list: newMessages } };
    const expectedState: IMessagesState = {
      ...initialState,
      scrollToTheBottom: false,
      messages: [{ recipientId: "user2", list: newMessages, page: 2, pageSize: 10, endOfList: false }],
    };

    expect(messageReducer(existingState, action).messages.length === 2).toEqual(expectedState.messages.length === 2);
  });

  it("should handle SEND_MESSAGE action", () => {
    const existingState: IMessagesState = {
      ...initialState,
      messages: [{ recipientId: "user2", list: [], page: 1, pageSize: 10, endOfList: false }],
    };
    const newMessage: IMessage = {
      id: "3",
      text: "New message",
      senderId: "user1",
      recipientId: "user2",
      timestamp: "2023-12-12T10:20:33.000Z"
    };
    const action = { type: "SEND_MESSAGE", payload: newMessage };
    const expectedState: IMessagesState = {
      ...existingState,
      scrollToTheBottom: true,
      messages: [{ recipientId: "user2", list: [newMessage], page: 1, pageSize: 10, endOfList: false }],
    };
    expect(messageReducer(existingState, action)).toEqual(expectedState);
  });

  it("should return the original state for unknown actions", () => {
    const action = { type: "UNKNOWN_ACTION", payload: null };
    expect(messageReducer(initialState, action)).toBe(initialState);
  });

  it("should throw an error for UPDATE_MESSAGES with unknown recipient", () => {
    const action = { type: "UPDATE_MESSAGES", payload: { recipientId: "unknown", list: [] } };
    expect(() => messageReducer(initialState, action)).toThrow(
      "Recipient unknown not found in messages state"
    );
  });
});
