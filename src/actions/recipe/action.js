import fetch from 'isomorphic-fetch';

export const REQUEST_RECIPE = 'REQUEST_RECIPE';
export const RECEIVE_RECIPE = 'RECEIVE_RECIPE';
export const REQUEST_RECIPE_FAILURE = 'REQUEST_RECIPE_FAILURE';
export const FILTER_RECIPE = 'FILTER_RECIPE';

export function requestRecipe(recipeName) {
  return {
    type: REQUEST_RECIPE,
    recipeName,
  };
}

export function receiveRecipe(recipeName, recipe) {
  return {
    type: RECEIVE_RECIPE,
    recipeName,
    recipe: recipe,
  };
}

export function requestRecipeFailure() {
  return {
    type: REQUEST_RECIPE_FAILURE,
  };
}

export function fetchRecipe(recipeName) {
  return function(dispatch) {
    dispatch(requestRecipe(recipeName));
    return fetch(`http://0.0.0.0:3000/data/recipes/${recipeName}`)
      .then(response => response.json())
      .then(json => dispatch(receiveRecipe(recipeName, json)))
      .catch(() => dispatch(requestRecipeFailure()));
  };
}
