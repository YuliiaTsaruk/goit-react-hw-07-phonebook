import { ContactForm, Filter, ContactList } from 'components';

import { GlobalStyle } from './GlobalStyle';
import { Container, MaineTitle, Section, Title } from './App.styled';
import { useSelector } from 'react-redux';

export const App = () => {
  const contacts = useSelector(state => state.contacts);

  return (
    <Container>
      <Section>
        <MaineTitle>Phonebook</MaineTitle>
        <ContactForm />
      </Section>

      <Section>
        <Title>Contacts</Title>
        {contacts.length > 0 ? (
          <Filter></Filter>
        ) : (
          <p>You don't have any contacts yet</p>
        )}
        <ContactList />
      </Section>

      <GlobalStyle />
    </Container>
  );
};
