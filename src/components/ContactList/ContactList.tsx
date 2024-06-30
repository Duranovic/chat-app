import { useCallback, useEffect, useRef } from "react";
import { useContactContext } from "../../context/ContactContext";
import ContactItem from "../ContactItem/ContactItem";
import styles from "./ContactList.module.scss";
import { useScrollToEnd } from "../../hooks/useScrollToEnd";
import { fetchContacts } from "../../data/contacts";
import { SCROLL_ANCHOR } from "../../utils/constants";
import { IContact } from "../../models/contact";

const ContactList = () => {
  const contactListRef = useRef(null);
  const context = useContactContext(); 

  if (!context) {
    throw new Error("ContactsList must be used within a ContactProvider");
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
      // If contacts are already loaded in the state, do not load initial contacts again
      if(state.contacts.page >= 2) {
        return;
      }
    fetchContacts(
      state.contacts.page,
      state.contacts.pageSize
    ).then(contacts => {
      dispatch({
          type: "SET_CONTACTS",
          payload: { list: contacts ?? [], endOfList: contacts?.length === 0 },
        });
    });
  }, [state.contacts.page, state.contacts.pageSize])

  useScrollToEnd(contactListRef, SCROLL_ANCHOR.BOTTOM, loadMoreContacts);

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
          lastMessage={contact.latestMessage?.text || ""}
          onItemSelected={() => setSelectedContact(contact.id)}
          active={contact.id === state.selectedContactId}
        />
      ))}
    </div>
  );
};

export default ContactList;
