import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCocktailById } from '../services/cocktailAPI';
import { getMealsRecommendations } from '../services/mealAPI';
import Recommendations from '../components/Recommendations';
import ButtonsDetailsPage from '../components/ButtonsDetailsPage';
import ButtonStart from '../components/ButtonStart';

function CocktailDetails() {
  const params = useParams();
  const [area, setArea] = useState('');
  const [recipeId, setRecipeId] = useState('');
  const [ingredMeasures, setIngredMeasures] = useState([]);
  const [title, setTitle] = useState('');
  const [source, setSource] = useState('');
  const [category, setCategory] = useState('');
  const [instructions, setInstructions] = useState('');
  const [mealsRecommendations, setMealsRecommendations] = useState([]);

  useEffect(() => {
    setRecipeId(params.id);
    getMealsRecommendations()
      .then((res) => setMealsRecommendations(res));
    getCocktailById(params.id)
      .then((res) => {
        const ingredientsArray = [];
        const measureArray = [];
        setTitle(res.drinks[0].strDrink);
        setSource(res.drinks[0].strDrinkThumb);
        setCategory(res.drinks[0].strAlcoholic);
        setArea(res.drinks[0].strCategory);
        setInstructions(res.drinks[0].strInstructions);
        Object.entries(res.drinks[0]).forEach(([key, value]) => {
          const noValue = 0;
          const minLength = 1;
          const ingredients = key.startsWith('strIngredient') ? value : noValue;
          const measure = key.startsWith('strMeasure') ? value : noValue;
          if (ingredients !== noValue
            && ingredients !== null && ingredients.length > minLength) {
            ingredientsArray.push(ingredients);
          }
          if (measure !== noValue) {
            measureArray.push(measure);
          }
        });
        const getTogether = ingredientsArray
          .map((ingredient, index) => ({ [ingredient]: measureArray[index] }));
        setIngredMeasures(getTogether);
      });
  }, [params]);

  return (
    <div className="meal-details-page">
      <img
        alt="Cocktail"
        data-testid="recipe-photo"
        src={ source }
        height="200px"
      />
      <h1 data-testid="recipe-title">{title}</h1>
      <ButtonsDetailsPage
        api={ {
          key: 'cocktail', recipeId, area, category, title, source } }
      />
      <h3 data-testid="recipe-category">{category}</h3>
      <h3>Ingredientes</h3>
      <ul>
        {ingredMeasures.map((element, index) => {
          const [key] = Object.keys(element);
          const [value] = Object.values(element);
          if (value) {
            return (
              <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
                { `${key} - ${value}`}
              </li>
            );
          }
          return (
            <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              { `${key}`}
            </li>
          );
        })}
      </ul>

      <h3>Instruções</h3>
      <p data-testid="instructions">{instructions}</p>
      <h3>Recomendações</h3>
      <Recommendations api={ mealsRecommendations } />
      <ButtonStart data={ { key: 'cocktail', recipeId, ingredMeasures } } />
    </div>
  );
}

export default CocktailDetails;
