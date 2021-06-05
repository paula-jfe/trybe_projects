export const REQUEST_STARTED = 'REQUEST_STARTED';
export const requestStarted = () => ({ type: REQUEST_STARTED });

export const MEALS_REQUEST = 'MEALS_REQUEST';
export const mealsRequest = (meals) => ({ type: MEALS_REQUEST, meals });

export const COCKTAILS_REQUEST = 'COCKTAILS_REQUEST';
export const cocktailsRequest = (drinks) => ({ type: COCKTAILS_REQUEST, drinks });

export const MEAL_CATEGORIES_REQUEST = 'MEAL_CATEGORIES_REQUEST';
export const mealCategoriesRequest = (categories) => ({
  type: MEAL_CATEGORIES_REQUEST, categories,
});

export const DRINK_CATEGORIES_REQUEST = 'DRINK_CATEGORIES_REQUEST';
export const drinkCategoriesRequest = (categories) => ({
  type: DRINK_CATEGORIES_REQUEST, categories,
});

export const REQUEST_FAIL = 'REQUEST_FAIL';
export const requestFail = (error) => ({ type: REQUEST_FAIL, error });

export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const getIngredientsSuccess = (ingredients) => (
  { type: GET_INGREDIENTS_SUCCESS, ingredients });

export const SAVE_INGREDIENT = 'SAVE_INGREDIENT';
export const saveIngredient = (ingredient) => ({
  type: SAVE_INGREDIENT, ingredient,
});

export const GET_MEALS_BY_INGREDIENT = 'GET_MEALS_BY_INGREDIENT';
export const getMealsByIngSuccess = (meals) => (
  { type: GET_MEALS_BY_INGREDIENT, meals });

export const GET_DRINKS_BY_INGREDIENT = 'GET_DRINKS_BY_INGREDIENT';
export const getDrinksByIngSuccess = (drinks) => (
  { type: GET_DRINKS_BY_INGREDIENT, drinks });

export const GET_AREAS_SUCCESS = 'GET_AREAS_SUCCESS';
export const getAreasSuccess = (meals) => (
  { type: GET_AREAS_SUCCESS, meals });

export function fetchCards(isMeal) {
  return async (dispatch) => {
    if (isMeal) {
      try {
        dispatch(requestStarted());
        const requestMeals = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const requestMealCategories = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        const result = await requestMeals.json();
        const categories = await requestMealCategories.json();
        dispatch(mealsRequest(result.meals));
        dispatch(mealCategoriesRequest(categories.meals));
      } catch (error) {
        dispatch(requestFail(error));
      }
    }
    try {
      dispatch(requestStarted());
      const requestCocktails = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const requestDrinkCategories = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const result = await requestCocktails.json();
      const categories = await requestDrinkCategories.json();
      dispatch(cocktailsRequest(result.drinks));
      dispatch(drinkCategoriesRequest(categories.drinks));
    } catch (error) {
      dispatch(requestFail(error));
    }
  };
}

export function getIngredients(api, isMeal) {
  return async (dispatch) => {
    dispatch(requestStarted());
    const ingredients = await api();
    if (isMeal) {
      dispatch(getIngredientsSuccess(ingredients.meals));
    } else {
      dispatch(getIngredientsSuccess(ingredients.drinks));
    }
  };
}

export function getMealsByIngredient(api, ingredient) {
  return async (dispatch) => {
    dispatch(requestStarted());
    const meals = await api(ingredient);
    dispatch(getMealsByIngSuccess(meals.meals));
  };
}

export function getDrinksByIngredient(api, ingredient) {
  return async (dispatch) => {
    dispatch(requestStarted());
    const drinks = await api(ingredient);
    dispatch(getDrinksByIngSuccess(drinks.drinks));
  };
}

export function getAreas(api) {
  return async (dispatch) => {
    dispatch(requestStarted());
    const meals = await api();
    dispatch(getAreasSuccess(meals.meals));
  };
}
