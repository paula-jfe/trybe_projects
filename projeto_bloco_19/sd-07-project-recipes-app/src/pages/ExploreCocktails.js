import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FlexContainer from '../components/FlexContainer';
import ButtonMedium from '../components/ButtonMedium';
import { randomCocktail } from '../services/cocktailAPI';
import allActions from '../actions';

function ExploreCocktails() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allActions.changePageTitle('Explorar Bebidas'));
  }, [dispatch]);

  const history = useHistory();

  function handleClick(e, url) {
    e.preventDefault();
    history.push(`/explorar/bebidas/${url}`);
  }

  function surpriseMe(e) {
    e.preventDefault();
    randomCocktail()
      .then((response) => history.push(`/bebidas/${response.drinks[0].idDrink}`));
  }

  // history.push(`/comidas/${response.meals[0].idMeal}`)

  return (
    <div>
      <Header />
      <FlexContainer>
        <ButtonMedium
          data-testid="explore-by-ingredient"
          onClick={ (e) => handleClick(e, 'ingredientes') }
        >
          Por Ingredientes
        </ButtonMedium>
        <ButtonMedium
          data-testid="explore-surprise"
          onClick={ (e) => surpriseMe(e) }
        >
          Me Surpreenda!
        </ButtonMedium>
      </FlexContainer>
      <Footer />
    </div>
  );
}

export default ExploreCocktails;
