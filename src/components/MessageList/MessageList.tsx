import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import Message from "../Message/Message";
import { fetchMessages } from "../../data/messages";
import { useScrollToEnd } from "../../hooks/useScrollToEnd";
import { SCROLL_ANCHOR } from "../../utils/constants";
import styles from "./MessageList.module.scss";
import { useContactContext } from "../../hooks/useContactContext";
import { useMessagesContext } from "../../hooks/useMessageContext";
import { EmptyList } from "../EmptyList/EmptyList";

const MessageList = () => {
  const contactContext = useContactContext();
  const messagesContext = useMessagesContext();

  if (!contactContext) {
    throw new Error("MessageList must be used within a ContactProvider");
  }

  if (!messagesContext) {
    throw new Error("MessageList must be used within a ChatProvider");
  }

  const { dispatch } = messagesContext;

  const userId = "0";
  const messageListRef = useRef<HTMLDivElement>(null);
  const recipientId = contactContext.state.selectedContactId ?? "1";
  const messagesToShow =
    messagesContext.state.messages.find(
      (item) =>
        item.recipientId === contactContext.state.selectedContactId ||
        item.recipientId === userId
    )?.list ?? [];
  const foundRecipient = messagesContext.state.messages.find(
    (item) => item.recipientId === recipientId
  );

  const loadMoreMessages = useCallback(() => {
    if (foundRecipient && !foundRecipient.endOfList) {
      fetchMessages(
        userId,
        recipientId,
        foundRecipient?.page,
        foundRecipient?.pageSize
      ).then((messages) => {
        dispatch({
          type: "UPDATE_MESSAGES",
          payload: {
            recipientId: recipientId,
            list: messages,
          },
        });
      });
    }
  }, [foundRecipient, recipientId, dispatch]);

  useLayoutEffect(() => {
    if (messageListRef.current && messagesContext.state.scrollToTheBottom) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messagesContext.state, recipientId]);

  useEffect(() => {
    // If contact is found in the state, do not load initial messages again
    if (
      messagesContext.state.messages.find(
        (item) => item.recipientId === recipientId
      )
    ) {
      return;
    }
    // Load initial messages
    fetchMessages(userId, recipientId, 1, 10).then((messages) => {
      dispatch({
        type: "SET_MESSAGES",
        payload: {
          recipientId: recipientId,
          list: messages,
        },
      });
    });
  }, [recipientId, messagesContext.state.messages, dispatch]);

  useScrollToEnd(messageListRef, SCROLL_ANCHOR.TOP, loadMoreMessages);


  return (
      <div className={styles.message_list} ref={messageListRef}>
      {messagesToShow.length > 0 ? (
        messagesToShow.map((message) => (
          <Message
            key={message.id}
            sent={userId === message.senderId}
            content={message.text}
            timestamp={message.timestamp}
          />
        ))
      ) : (
        <EmptyList
          title="There are no messages!"
          desscription="Start sending messages and they will appear here!"
          image="src/assets/speech-bubble.png"
        />
      )}
    </div>
  );
};

export default MessageList;
