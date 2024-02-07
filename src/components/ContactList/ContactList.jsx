import { ContactElement } from 'components';
import { List } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice';

export const ContactList = () => {
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const addFilter = () => {
    if (filter === '') {
      return contacts;
    }
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  const filteredContacts = addFilter();

  return (
    <List>
      {filteredContacts.map(contact => (
        <ContactElement
          key={contact.id}
          id={contact.id}
          name={contact.name}
          number={contact.number}
          onDelete={() => dispatch(deleteContact(contact.id))}
        />
      ))}
    </List>
  );
};
