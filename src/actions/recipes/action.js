import fetch from 'isomorphic-fetch';

export const REQUEST_RECIPES = 'REQUEST_RECIPES';
export const RECEIVE_RECIPES = 'RECEIVE_RECIPES';
export const REQUEST_RECIPES_FAILURE = 'REQUEST_RECIPES_FAILURE';
export const FILTER_RECIPES = 'FILTER_RECIPES';
export const SHOW_MORE_RECIPES = 'SHOW_MORE_RECIPES';
export const SORT_RECIPES = 'SORT_RECIPES';

export function requestRecipes() {
  return {
    type: REQUEST_RECIPES,
  };
}

export function receiveRecipes(recipes) {
  return {
    type: RECEIVE_RECIPES,
    recipes: recipes,
  };
}

export function requestRecipesFailure() {
  return {
    type: REQUEST_RECIPES_FAILURE,
  };
}

export function fetchRecipes() {
  return function(dispatch) {
    dispatch(requestRecipes());
    return fetch('http://0.0.0.0:3000/data/recipes')
      .then(response => response.json())
      .then(json => dispatch(receiveRecipes(json)))
      .catch(() => dispatch(requestRecipesFailure()));
  };
}

export function filterRecipes(searchTerm) {
  return {
    type: FILTER_RECIPES,
    searchTerm,
  };
}

export function showMoreRecipes() {
  return {
    type: SHOW_MORE_RECIPES,
  };
}

export function sortRecipes() {
  return {
    type: SORT_RECIPES,
  };
}
