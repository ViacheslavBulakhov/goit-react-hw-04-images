import PropTypes from 'prop-types';
import { useState } from 'react';

import {
  SearchbarWrap,
  SearchForm,
  SearchFormButton,
  SearchFormIcon,
  SearchFormInput,
} from './Searchbar.styled';

export function Searchbar({ onSubmit }) {
  const [searchName, setSearchName] = useState('');

  const searchValue = ({ currentTarget }) => {
    setSearchName(currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit(searchName.trim().toLowerCase());
    setSearchName('');
  };

  return (
    <SearchbarWrap>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <SearchFormIcon />
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={searchValue}
          value={searchName}
        />
      </SearchForm>
    </SearchbarWrap>
  );
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
