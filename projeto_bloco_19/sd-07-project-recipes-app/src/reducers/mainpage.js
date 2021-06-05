import {
  REQUEST_STARTED,
  MEALS_REQUEST,
  COCKTAILS_REQUEST,
  REQUEST_FAIL,
  MEAL_CATEGORIES_REQUEST,
  DRINK_CATEGORIES_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  SAVE_INGREDIENT,
  GET_MEALS_BY_INGREDIENT,
  GET_DRINKS_BY_INGREDIENT,
  GET_AREAS_SUCCESS,
} from '../actions/mainpage';

const INITIAL_STATE = {
  meals: [],
  drinks: [],
  isLoading: false,
  mealCategories: [],
  drinkCategories: [],
  ingredients: [],
  selectedIngredient: '',
  ingredientIsSelected: false,
  mealsByIngredients: [],
  drinksByIngredients: [],
  areaList: [],
};

function mainpage(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_STARTED:
    return { ...state, isLoading: true };
  case MEALS_REQUEST:
    return { ...state, meals: action.meals, isLoading: false };
  case COCKTAILS_REQUEST:
    return { ...state, drinks: action.drinks, isLoading: false };
  case MEAL_CATEGORIES_REQUEST:
    return { ...state, mealCategories: action.categories, isLoading: false };
  case DRINK_CATEGORIES_REQUEST:
    return { ...state, drinkCategories: action.categories, isLoading: false };
  case REQUEST_FAIL:
    return { ...state, meals: action.meals, isLoading: false };
  case GET_INGREDIENTS_SUCCESS:
    return { ...state, ingredients: action.ingredients, isLoading: false };
  case SAVE_INGREDIENT:
    return {
      ...state,
      selectedIngredient: action.ingredient,
      ingredientIsSelected: true };
  case GET_MEALS_BY_INGREDIENT:
    return { ...state, mealsByIngredients: action.meals, isLoading: false };
  case GET_DRINKS_BY_INGREDIENT:
    return { ...state, drinksByIngredients: action.drinks, isLoading: false };
  case GET_AREAS_SUCCESS:
    return { ...state, areaList: action.meals, isLoading: false };
  default:
    return state;
  }
}

export default mainpage;
