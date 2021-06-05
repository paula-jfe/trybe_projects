const handleAction = (api, heartStatus) => {
  const { key } = api;
  let categoryEntry = '';
  let isAlcoholicEntry = '';
  const pathCheck = window.location.pathname.includes('/in-progress');
  if (pathCheck) {
    categoryEntry = api.category;
    isAlcoholicEntry = api.alcoholic;
  } else {
    categoryEntry = api.area;
    isAlcoholicEntry = api.category;
  }

  const recipeCocktail = {
    id: api.recipeId,
    type: 'bebida',
    area: '',
    category: categoryEntry,
    alcoholicOrNot: isAlcoholicEntry,
    name: api.title,
    image: api.source,
  };

  const recipeMeal = {
    id: api.recipeId,
    type: 'comida',
    area: api.area,
    category: api.category,
    alcoholicOrNot: '',
    name: api.title,
    image: api.source,
  };

  const addNewRecipe = key === 'cocktail' ? recipeCocktail : recipeMeal;

  if (heartStatus === 'white') {
    const getStatus = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const myRecipes = [...getStatus, addNewRecipe];
    localStorage.removeItem('favoriteRecipes');
    localStorage.setItem('favoriteRecipes', JSON.stringify(myRecipes));
    return 'black';
  }
  const getStatus = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const returned = getStatus.filter((recipe) => recipe.id !== api.recipeId);
  localStorage.removeItem('favoriteRecipes');
  localStorage.setItem('favoriteRecipes', JSON.stringify(returned));
  return 'white';
};

export default handleAction;
