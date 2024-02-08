import { ContactElement } from 'components';
import { List } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectContacts,
  selectFilter,
  selectFilteredContacts,
  selectorIsDeleting,
} from '../../redux/selectors';
import { deleteContact } from '../../redux/operations';
import toast from 'react-hot-toast';

export const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const isDeletingStatus = useSelector(selectorIsDeleting);
  const filteredContactsList = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();

  const addFilter = () => {
    if (filter === '') {
      return contacts;
    }
    return filteredContactsList;
  };
  const filteredContacts = addFilter();

  const handleDelete = id => () => {
    dispatch(deleteContact(id))
      .then(() => {
        toast.success('Contact deleted');
      })
      .catch(error => {
        console.error('Delete contact error:', error);
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
          isDeleting={isDeletingStatus}
        />
      ))}
    </List>
  );
};
