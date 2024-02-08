import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Error,
  StyledBtn,
  StyledField,
  StyledForm,
  StyledLabel,
} from './ContactForm.styled';
import { useDispatch, useSelector } from 'react-redux';

import { Report } from 'notiflix';
import { selectContacts } from '../../redux/selectors';
import { addContact } from '../../redux/operations';
import toast from 'react-hot-toast';

const contactSchema = Yup.object().shape({
  name: Yup.string().min(3, 'Too Short!').required('Required'),
  number: Yup.string()
    .matches(/^[0-9]+$/, 'Must contain only number - 0123456789')
    .min(5, 'Must be 5 or more')
    .required('Required'),
});

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleAddContact = newContact => {
    const checkName = contacts.some(
      checkContact =>
        checkContact.name.toLocaleLowerCase() ===
        newContact.name.toLocaleLowerCase()
    );

    if (checkName) {
      Report.failure(
        'Notiflix Failure',
        `Cannot add to contacts this name: ${newContact.name} is already in contacts.`,
        'Okay'
      );
      return;
    }

    dispatch(addContact(newContact));
    toast.success('Successfully, new contact creted');
  };

  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={contactSchema}
      onSubmit={(newContact, actions) => {
        handleAddContact(newContact);
        actions.resetForm();
      }}
    >
      <StyledForm>
        <StyledLabel>
          Name
          <StyledField name="name" />
          <Error name="name" component="span" />
        </StyledLabel>

        <StyledLabel>
          Number
          <StyledField name="number" type="tel" />
          <Error name="number" component="span" />
        </StyledLabel>

        <StyledBtn type="submit">Add contact</StyledBtn>
      </StyledForm>
    </Formik>
  );
};
