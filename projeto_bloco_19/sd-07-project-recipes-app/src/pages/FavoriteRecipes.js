import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import allActions from '../actions';
import ButtonsFavoritePage from '../components/ButtonsFavoritePage';

function FavoriteRecipes() {
  const [favorites, setFavorites] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allActions.changePageTitle('Receitas Favoritas'));
  }, [dispatch]);

  useEffect(() => {
    const getFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavorites(getFavorites);
    setFilteredRecipes(getFavorites);
  }, []);

  const updateLocalStorage = (id) => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newStorage = storage.filter((recipe) => recipe.id !== id);
    setFilteredRecipes(newStorage);
  };

  const filterFavorites = ({ target }) => {
    const filterSelected = target.getAttribute('data-testid');
    if (filterSelected === 'filter-by-food-btn') {
      setFilteredRecipes(favorites.filter((recipe) => recipe.type === 'comida'));
    } else if (filterSelected === 'filter-by-drink-btn') {
      setFilteredRecipes(favorites.filter((recipe) => recipe.type === 'bebida'));
    } else {
      setFilteredRecipes(favorites);
    }
  };

  return (
    <div>
      <Header />
      <div>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ filterFavorites }
        >
          Todos
        </button>
        <button
          data-testid="filter-by-food-btn"
          type="button"
          onClick={ filterFavorites }
        >
          Comida
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ filterFavorites }
        >
          Bebida
        </button>
      </div>
      { filteredRecipes.map((element, index) => (
        <div key={ index }>
          <Link
            to={ element.type === 'bebida' ? `/bebidas/${element.id}`
              : `/comidas/${element.id}` }
          >
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ element.image }
              alt={ `${element.name} foto` }
              width="100px"
            />
          </Link>
          <h4
            data-testid={ `${index}-horizontal-top-text` }
          >
            { element.type === 'bebida' ? element.alcoholicOrNot
              : `${element.area} - ${element.category}` }
          </h4>
          <Link
            to={ element.type === 'bebida' ? `/bebidas/${element.id}`
              : `/comidas/${element.id}` }
          >
            <h3
              data-testid={ `${index}-horizontal-name` }
            >
              { element.name }
            </h3>
          </Link>

          <ButtonsFavoritePage
            storage={ { element, index } }
            handleClick={ updateLocalStorage }
          />
        </div>
      ))}
    </div>
  );
}

export default FavoriteRecipes;
