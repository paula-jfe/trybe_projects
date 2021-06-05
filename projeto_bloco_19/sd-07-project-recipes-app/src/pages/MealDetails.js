import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMealById } from '../services/mealAPI';
import { getCocktailsRecommendations } from '../services/cocktailAPI';
import Recommendations from '../components/Recommendations';
import ButtonsDetailsPage from '../components/ButtonsDetailsPage';
import ButtonStart from '../components/ButtonStart';

function MealDetails() {
  const params = useParams();
  const [recipeId, setRecipeId] = useState('');
  const [ingredMeasures, setIngredMeasures] = useState([]);
  const [title, setTitle] = useState('');
  const [source, setSource] = useState('');
  const [video, setVideo] = useState('');
  const [category, setCategory] = useState('');
  const [area, setArea] = useState('');
  const [instructions, setInstructions] = useState('');
  const [cocktailsRecommendations, setCocktailsRecommendations] = useState([]);

  useEffect(() => {
    setRecipeId(params.id);
    getCocktailsRecommendations()
      .then((res) => setCocktailsRecommendations(res));
    getMealById(params.id)
      .then((res) => {
        const ingredientsArray = [];
        const measureArray = [];
        setTitle(res.meals[0].strMeal);
        setSource(res.meals[0].strMealThumb);
        setVideo(res.meals[0].strYoutube);
        setCategory(res.meals[0].strCategory);
        setArea(res.meals[0].strArea);
        setInstructions(res.meals[0].strInstructions);
        Object.entries(res.meals[0]).forEach(([key, value]) => {
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

  const videoUrl = video.replace('watch?v=', 'embed/');
  return (
    <div className="meal-details-page">
      <img
        alt="Meal"
        data-testid="recipe-photo"
        src={ source }
        height="200px"
      />
      <h1 data-testid="recipe-title">{ title }</h1>
      <ButtonsDetailsPage
        api={ {
          key: 'meal', recipeId, area, category, title, source } }
      />
      <h3 data-testid="recipe-category">{ category }</h3>
      <h3>Ingredientes</h3>
      <ul>
        { ingredMeasures.map((element, index) => {
          const [key] = Object.keys(element);
          const [value] = Object.values(element);
          return (
            <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              { `${key} - ${value}` }
            </li>
          );
        }) }
      </ul>

      <h3>Instruções</h3>
      <p data-testid="instructions">{ instructions }</p>

      <h3>Vídeo</h3>
      <iframe
        title="recipe-video"
        data-testid="video"
        frameBorder="0"
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        width="560"
        height="315"
        src={ videoUrl }
      />
      <h3>Recomendações</h3>
      <Recommendations api={ cocktailsRecommendations } />
      <ButtonStart data={ { key: 'meal', recipeId, ingredMeasures } } />
    </div>
  );
}

export default MealDetails;
