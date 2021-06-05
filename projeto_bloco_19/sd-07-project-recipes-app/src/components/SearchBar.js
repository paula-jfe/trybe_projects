import React from 'react';
import { useSelector } from 'react-redux';

function SearchBar() {
  const state = useSelector(({ header }) => header);
  const { barIsShowing } = state;

  if (barIsShowing) {
    return (
      <form>
        <input data-testid="search-input" type="text" />
      </form>
    );
  } return null;
}

export default SearchBar;
