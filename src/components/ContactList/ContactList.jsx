import { ContactElement } from 'components';
import { List } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectContacts,
  selectFilter,
  selectFilteredContacts,
} from '../../redux/selectors';
import { deleteContact } from '../../redux/operations';

export const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
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
    dispatch(deleteContact(id));
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
        />
      ))}
    </List>
  );
};
