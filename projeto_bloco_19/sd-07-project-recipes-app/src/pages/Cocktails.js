import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import allActions from '../actions';

function Cocktails() {
  const state = useSelector(({ mainpage }) => mainpage);
  const {
    drinks,
    isLoading,
    drinkCategories,
    selectedIngredient,
    drinksByIngredients } = state;
  const dispatch = useDispatch();
  const [filterOn, setFilterOn] = useState(false);
  const [filteredDrinks, setFilteredDrinks] = useState([]);
  const [cardsArray, setCardsArray] = useState([]);
  const [filter, setFilter] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    dispatch(allActions.renderSearchIcon());
    dispatch(allActions.changePageTitle('Bebidas'));
    dispatch(allActions.fetchCards(false));
  }, [dispatch]);

  useEffect(() => {
    function checkFilter() {
      if (filterOn) {
        setCardsArray(filteredDrinks);
      } else if (selectedIngredient !== '') {
        setCardsArray(drinksByIngredients);
      } else {
        setCardsArray(drinks);
      }
    }
    checkFilter();
  }, [isLoading, filterOn, filteredDrinks, drinks]);

  useEffect(() => {
    const fetchFiltered = async () => {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter}`);
      const json = await response.json();
      setFilteredDrinks(json.drinks);
      setFilterOn(true);
    };
    if (isFetching) {
      fetchFiltered();
    }
  }, [filter, isFetching]);

  const turnFilterOn = (cat) => {
    if (filterOn) {
      setFilterOn(false);
      setFilter(cat);
      setIsFetching(true);
    } else {
      setFilter(cat);
      setIsFetching(true);
    }
  };

  const renderFilters = (category, index) => {
    const CAT_NUMBER = 5;
    if (index < CAT_NUMBER) {
      return (
        <button
          type="button"
          key={ category.strCategory }
          data-testid={ `${category.strCategory}-category-filter` }
          onClick={ () => turnFilterOn(category.strCategory) }
        >
          {category.strCategory}
        </button>
      );
    } return null;
  };

  const renderCards = (drink, index) => {
    const CARDS_NUMBER = 12;
    if (index < CARDS_NUMBER) {
      return (
        <Link to={ `/bebidas/${drink.idDrink}` }>
          <div
            data-testid={ `${index}-recipe-card` }
            key={ `card-${index}` }
          >
            <img
              key={ `drink-thumb-${index}` }
              src={ drink.strDrinkThumb }
              alt="drink thumb"
              data-testid={ `${index}-card-img` }
            />
            <h2
              key={ drink.strDrink }
              data-testid={ `${index}-card-name` }
            >
              {drink.strDrink}
            </h2>
          </div>
        </Link>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <h1>Carregando...</h1>
    );
  }
  return (
    <div>
      <Header />
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => setFilterOn(false) }
      >
        All
      </button>
      {drinkCategories.map((category, index) => renderFilters(category, index))}
      {cardsArray.map((drink, index) => renderCards(drink, index))}
      <Footer />
    </div>
  );
}

export default Cocktails;
