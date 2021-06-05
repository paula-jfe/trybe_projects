import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import allActions from '../actions';
import { areas, mealsByArea } from '../services/mealAPI';

function ExploreMealsOrigin() {
  const dispatch = useDispatch();
  const state = useSelector(({ mainpage }) => mainpage);
  const { meals, isLoading, areaList } = state;
  const [cardsArray, setCardsArray] = useState([]);
  const [filter, setFilter] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    dispatch(allActions.renderSearchIcon());
    dispatch(allActions.changePageTitle('Explorar Origem'));
    dispatch(allActions.fetchCards(true));
    dispatch(allActions.getAreas(areas));
  }, [dispatch]);

  useEffect(() => {
    setCardsArray(meals);
  }, [isLoading]);

  useEffect(() => {
    if (isFetching) {
      mealsByArea(filter).then((response) => setCardsArray(response.meals));
    }
  }, [filter, isFetching]);

  const turnFilterOn = (origin) => {
    if (origin === 'All') {
      setCardsArray(meals);
    } else {
      setFilter(origin);
      setIsFetching(true);
    }
  };

  const renderFilters = (area) => (
    <option data-testid={ `${area.strArea}-option` }>
      {area.strArea}
    </option>
  );

  const renderCards = (meal, index) => {
    const CARDS_NUMBER = 12;
    if (index < CARDS_NUMBER) {
      return (
        <Link to={ `/comidas/${meal.idMeal}` }>
          <div
            data-testid={ `${index}-recipe-card` }
            key={ `card-${index}` }
            className="card"
          >
            <img
              className="card-img-top"
              key={ `meal-thumb-${index}` }
              src={ meal.strMealThumb }
              alt="meal thumb"
              data-testid={ `${index}-card-img` }
            />
            <div key={ `card-body-${index}` }>
              <h2
                className="card-title"
                key={ meal.strMeal }
                data-testid={ `${index}-card-name` }
              >
                {meal.strMeal}
              </h2>
            </div>
          </div>
        </Link>
      );
    }
    return null;
  };

  if (isLoading) {
    console.log(cardsArray);
    return (
      <h1>Loading...</h1>
    );
  }
  return (
    <div>
      <Header />
      <form>
        <select
          data-testid="explore-by-area-dropdown"
          onChange={ ({ target }) => turnFilterOn(target.value) }
        >
          <option data-testid="All-option">
            All
          </option>
          {areaList.map((area) => renderFilters(area))}
        </select>
      </form>
      {cardsArray.map((meal, index) => renderCards(meal, index))}
      <Footer />
    </div>
  );
}

export default ExploreMealsOrigin;
