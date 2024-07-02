import { IAction } from "../../models/action";
import { IMessagesState } from "../../models/messageState";

export const messageReducer = (state: IMessagesState, action: IAction) => {
  switch (action.type) {
    case "SET_MESSAGES": {
      const { recipientId, list } = action.payload;
      const messageIndex = state.messages.findIndex(
        (m) => m.recipientId === recipientId
      );

      if (messageIndex !== -1) {
        // If messages for this recipient already exist, it's not a SET action, so return the state unchanged
        return state;
      }

      const newMessage = {
        recipientId,
        list,
        page: 2, // Assuming you want to start at page 2 for subsequent loads
        pageSize: 10,
        endOfList: list.length < 10,
      };

      return {
        ...state,
        scrollToTheBottom: true,
        messages: [...state.messages, newMessage],
      };
    }
    case "UPDATE_MESSAGES": {
      const { recipientId, list } = action.payload;
      const messageIndex = state.messages.findIndex(
        (m) => m.recipientId === recipientId
      );

      if (messageIndex === -1) {
        // If messages for this recipient don't exist yet, handle the error
        throw new Error(`Recipient ${recipientId} not found in messages state`);
      }

      const updatedMessage = {
        ...state.messages[messageIndex],
        scrollToTheBottom: false,
        list: [...list, ...state.messages[messageIndex].list],
        page: state.messages[messageIndex].page + 1,
        endOfList: list.length === 0, // Check if there are no more messages to load
      };

      return {
        ...state,
        scrollToTheBottom: false,
        messages: [
          ...state.messages.slice(0, messageIndex),
          updatedMessage,
          ...state.messages.slice(messageIndex + 1),
        ],
      };
    }
    case "SEND_MESSAGE": {
      return {
        ...state,
        scrollToTheBottom: true,
        messages: state.messages.map((message) =>
          message.recipientId === action.payload.recipientId
            ? { ...message, list: [...message.list, action.payload] }
            : message
        ),
      };
    }

    default:
      return state;
  }
};
