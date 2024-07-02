import { useContext } from "react";
import { MessagesContext } from "../context/MessageContext";

export const useMessagesContext = () => {
    return useContext(MessagesContext);
};