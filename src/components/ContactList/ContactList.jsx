import { ContactElement } from 'components';
import { List } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectContacts,
  selectFilter,
  selectFilteredContacts,
} from '../../redux/selectors';
import { deleteContact } from '../../redux/operations';
import toast from 'react-hot-toast';
import { useState } from 'react';

export const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const filteredContactsList = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();

  const [deletingId, setDeletingId] = useState(null);

  const addFilter = () => {
    if (filter === '') {
      return contacts;
    }
    return filteredContactsList;
  };
  const filteredContacts = addFilter();

  const handleDelete = id => () => {
    setDeletingId(id);
    dispatch(deleteContact(id))
      .then(() => {
        toast.success('Contact deleted');
        setDeletingId(null);
      })
      .catch(error => {
        console.error('Delete contact error:', error);
        setDeletingId(null);
      });
  };

  return (
    <List>
      {filteredContacts.map(contact => (
        <ContactElement
          key={contact.id}
          id={contact.id}
          name={contact.name}
          number={contact.number}
          onDelete={handleDelete(contact.id)}
          isDeleting={contact.id === deletingId}
        />
      ))}
    </List>
  );
};
