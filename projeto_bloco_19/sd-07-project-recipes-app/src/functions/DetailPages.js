export const handleClickMeals = (recipeId) => {
  const getRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (getRecipes) {
    if (!getRecipes.meals[recipeId]) {
      const newRecipe = {
        ...getRecipes,
        meals: { ...getRecipes.meals, [recipeId]: [] },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newRecipe));
    }
  } else {
    const newRecipe = {
      cocktails: {},
      meals: { [recipeId]: [] },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newRecipe));
  }
};

export const handleClickCocktails = (recipeId) => {
  const getRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (getRecipes) {
    if (!getRecipes.cocktails[recipeId]) {
      const newRecipe = {
        ...getRecipes,
        cocktails: { ...getRecipes.cocktails, [recipeId]: [] },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newRecipe));
    }
  } else {
    const newRecipe = {
      cocktails: { [recipeId]: [] },
      meals: {},
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newRecipe));
  }
};
