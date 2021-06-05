export const randomMeal = () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/random.php';
  return fetch(endpoint)
    .then((response) => response.json())
    .then((json) => json);
};

export const getMealById = (id) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  return fetch(endpoint)
    .then((response) => response.json())
    .then((json) => json);
};

export const mealIngredients = () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  return fetch(endpoint)
    .then((response) => response.json())
    .then((json) => json);
};

export const getMealsRecommendations = () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  return fetch(endpoint)
    .then((response) => response.json())
    .then((json) => json.meals);
};

export const mealByIngredient = (ingredient) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  return fetch(endpoint)
    .then((response) => response.json())
    .then((json) => json);
};

export const areas = () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  return fetch(endpoint)
    .then((response) => response.json())
    .then((json) => json);
};

export const mealsByArea = (filter) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${filter}`;
  return fetch(endpoint)
    .then((response) => response.json())
    .then((json) => json);
};
