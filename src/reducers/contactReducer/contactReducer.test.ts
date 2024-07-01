import { contactReducer } from './contactReducer';
import { IContact } from '../../models/contact';
import { IMessage } from '../../models/message';
import { IContactState } from '../../context/ContactContext';

describe('contactReducer', () => {
  const initialState: IContactState = {
    contacts: {
      list: [],
      page: 1,
      pageSize: 15,
      endOfList: false,
    },
    selectedContactId: undefined,
  };

  it('should handle SET_CONTACTS action', () => {
    const newContacts: IContact[] = [{ id: '1', name: 'Alice' }, { id: '2', name: 'Bob' }];
    const action = { type: 'SET_CONTACTS', payload: { list: newContacts, endOfList: false } };
    const expectedState: IContactState = {
      ...initialState,
      contacts: { ...initialState.contacts, list: newContacts, page: 2 },
    };
    expect(contactReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_CONTACTS action', () => {
    const existingContacts: IContact[] = [{ id: '1', name: 'Alice' }];
    const newContacts: IContact[] = [{ id: '2', name: 'Bob' }, { id: '3', name: 'Charlie' }];
    const action = { type: 'UPDATE_CONTACTS', payload: { list: newContacts, endOfList: true } };

    const stateWithExistingContacts: IContactState = {
      ...initialState,
      contacts: { ...initialState.contacts, list: existingContacts, page: 2 },
    };
    const expectedState: IContactState = {
      ...stateWithExistingContacts,
      contacts: { ...stateWithExistingContacts.contacts, list: [...existingContacts, ...newContacts], page: 3, endOfList: true },
    };
    expect(contactReducer(stateWithExistingContacts, action)).toEqual(expectedState);
  });

  it('should handle SET_SELECTED_CONTACT action', () => {
    const action = { type: 'SET_SELECTED_CONTACT', payload: '2' };
    const expectedState = { ...initialState, selectedContactId: '2' };
    expect(contactReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SET_CONTACT_LATEST_MESSAGE action and sort contacts by timestamp', () => {
    const initialContacts: IContact[] = [
      { id: '1', name: 'Alice', latestMessage: { timestamp: '2023-01-01T12:00:00Z' } as IMessage },
      { id: '2', name: 'Bob', latestMessage: { timestamp: '2022-12-31T23:59:59Z' } as IMessage },
    ];
    const stateWithContacts: IContactState = { ...initialState, contacts: { ...initialState.contacts, list: initialContacts } };

    const action = {
      type: 'SET_CONTACT_LATEST_MESSAGE',
      payload: { recipientId: '2', timestamp: '2024-01-01T00:00:00Z' } as IMessage, // Updated message for Bob
    };

    const stateAfterAction = contactReducer(stateWithContacts, action);

    expect(stateAfterAction.contacts.list[0].id).toEqual(initialContacts[1].id); // Bob should now be first
  });

  it('should return the original state for unknown actions', () => {
    const action = { type: 'UNKNOWN_ACTION', payload: null };
    expect(contactReducer(initialState, action)).toBe(initialState);
  });
});