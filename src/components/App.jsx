import { ContactForm, Filter, ContactList } from 'components';

import { GlobalStyle } from './GlobalStyle';
import { Container, MaineTitle, Section, Title } from './App.styled';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectContacts,
  selectError,
  selectIsLoading,
} from '../redux/selectors';
import { useEffect } from 'react';
import { fetchContacts } from '../redux/operations';

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Container>
      <Section>
        <MaineTitle>Phonebook</MaineTitle>
        <ContactForm />
      </Section>

      <Section>
        <Title>Contacts</Title>
        {isLoading && <p>Loading contacts...</p>}
        {error && <p>{error}</p>}

        {contacts.length > 0 && !error && <Filter />}
        {contacts.length === 0 && !isLoading && !error && (
          <p>You don't have any contacts yet</p>
        )}

        <ContactList />
      </Section>

      <GlobalStyle />
    </Container>
  );
};
