import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ProfileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import allActions from '../actions';

function Header() {
  const state = useSelector(({ header }) => header);
  const { hasSearchIcon, pageTitle, barIsShowing } = state;
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSearchBar = () => {
    if (barIsShowing) {
      dispatch(allActions.hideBar());
    } else {
      dispatch(allActions.showBar());
    }
  };

  const changePage = () => {
    history.push('/perfil');
  };

  const renderIcon = () => {
    if (hasSearchIcon) {
      return (
        <button
          onClick={ handleSearchBar }
          type="button"
        >
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="search icon"
          />
        </button>
      );
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={ changePage }
      >
        <img
          data-testid="profile-top-btn"
          src={ ProfileIcon }
          alt="profile icon"
        />
      </button>
      <h1 data-testid="page-title">{pageTitle}</h1>
      {renderIcon()}
      <SearchBar />
    </div>
  );
}

export default Header;
