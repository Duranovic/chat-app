import { useContext } from "react";
import { ContactContext } from "../context/ContactContext";

// Custom hook for easy access to context
export const useContactContext = () => {
    return useContext(ContactContext);
  };