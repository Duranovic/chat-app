import { useCallback, useEffect, useRef } from "react";
import { IContact, useChatContext } from "../../context/ChatContext";
import ContactItem from "../ContactItem/ContactItem";
import styles from "./ContactList.module.scss";
import { useScrollToEnd } from "../../hooks/useScrollToEnd";
import { fetchContacts } from "../../data/contacts";

const ContactList = () => {
  const contactListRef = useRef(null);
  const context = useChatContext(); 

  if (!context) {
    throw new Error("ContactsList must be used within a ChatProvider");
  }
  const { state, dispatch } = context;

  const setSelectedContact = useCallback((id: string) => {
    context.dispatch({ type: "SET_SELECTED_CONTACT", payload: id });
  }, []);
  

  const loadMoreContacts = useCallback(
    () => {
      if (!state.contacts.endOfList) {        
        fetchContacts(
          state.contacts.page,
          state.contacts.pageSize
        ).then(contacts => {
          dispatch({
              type: "UPDATE_CONTACTS",
              payload: { list: contacts ?? [], endOfList: contacts?.length === 0 },
            });
        });

      }
    },
    [state.contacts.endOfList, state.contacts.page, state.contacts.pageSize]
  );

  const loadInitialContacts = useCallback(() =>{
    fetchContacts(
      state.contacts.page,
      state.contacts.pageSize
    ).then(contacts => {
      dispatch({
          type: "SET_CONTACTS",
          payload: { list: contacts ?? [],endOfList: contacts?.length === 0 },
        });
    });
  }, [fetchContacts])

  useScrollToEnd(contactListRef, loadMoreContacts);

  useEffect(()=>{
    loadInitialContacts();
  }, [loadInitialContacts])

  return  (
    <div className={styles.contact_list} ref={contactListRef}>
      {state?.contacts?.list?.map((contact: IContact) => (
        <ContactItem
          key={contact.id}
          name={contact.name}
          imgSrc={contact.profileImage}
          lastMessage={contact.latestMessage || ""}
          onItemSelected={() => setSelectedContact(contact.id)}
        />
      ))}
    </div>
  );
};

export default ContactList;
