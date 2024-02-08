import { Contact, StyledBtn } from './ContactElement.styled';

export const ContactElement = ({ name, number, onDelete, isDeleting }) => {
  return (
    <Contact>
      <p>{name}: </p> <p>{number}</p>
      <StyledBtn onClick={onDelete} disabled={isDeleting}>
        Delete
      </StyledBtn>
    </Contact>
  );
};
