import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import allActions from '../actions';

function ExploreCocktailsOrigin() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allActions.renderSearchIcon());
    dispatch(allActions.changePageTitle('Explorar Origem'));
  }, [dispatch]);

  return (
    <div>
      <Header />
      <p>Not Found</p>
    </div>
  );
}

export default ExploreCocktailsOrigin;
