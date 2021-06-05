import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import allActions from '../actions';

function DoneRecipes() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allActions.changePageTitle('Receitas Feitas'));
  }, [dispatch]);

  return (
    <Header />
  );
}

export default DoneRecipes;
