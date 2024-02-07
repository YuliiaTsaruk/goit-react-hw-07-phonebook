import { Contact, StyledBtn } from './ContactElement.styled';

export const ContactElement = ({ name, number, onDelete }) => {
  return (
    <Contact>
      <p>{name}: </p> <p>{number}</p>
      <StyledBtn onClick={onDelete}>Delete</StyledBtn>
    </Contact>
  );
};
