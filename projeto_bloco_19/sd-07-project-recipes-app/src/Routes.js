import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  Login,
  Meals,
  Cocktails,
  MealDetails,
  CocktailDetails,
  MealsInProgress,
  CocktailsInProgress,
  Explore,
  ExploreMeals,
  ExploreCocktails,
  ExploreMealsIngredients,
  ExploreCocktailsIngredients,
  ExploreMealsOrigin,
  ExploreCocktailsOrigin,
  Profile,
  DoneRecipes,
  FavoriteRecipes,
} from './import';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Meals } />
      <Route exact path="/bebidas" component={ Cocktails } />
      <Route exact path="/comidas/:id" component={ MealDetails } />
      <Route exact path="/bebidas/:id" component={ CocktailDetails } />
      <Route
        path="/comidas/:id/in-progress"
        component={ MealsInProgress }
      />
      <Route
        path="/bebidas/:id/in-progress"
        component={ CocktailsInProgress }
      />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/explorar/comidas" component={ ExploreMeals } />
      <Route exact path="/explorar/bebidas" component={ ExploreCocktails } />
      <Route
        path="/explorar/comidas/ingredientes"
        component={ ExploreMealsIngredients }
      />
      <Route
        path="/explorar/bebidas/ingredientes"
        component={ ExploreCocktailsIngredients }
      />
      <Route path="/explorar/comidas/area" component={ ExploreMealsOrigin } />
      <Route path="/explorar/bebidas/area" component={ ExploreCocktailsOrigin } />
      <Route path="/perfil" component={ Profile } />
      <Route path="/receitas-feitas" component={ DoneRecipes } />
      <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default Routes;
