import { useDispatch } from 'react-redux';
import { StyledInput, StyledLabel } from './Filter.styled';
import { setFilter } from '../../redux/filterSlice';

export const Filter = () => {
  const dispatch = useDispatch();

  return (
    <StyledLabel>
      Find contacts by name
      <StyledInput
        type="text"
        name="filter"
        placeholder="Search"
        onChange={evt => dispatch(setFilter(evt.target.value))}
      />
    </StyledLabel>
  );
};
