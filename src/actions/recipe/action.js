import fetch from 'isomorphic-fetch';

export const REQUEST_RECIPE = 'REQUEST_RECIPE';
export const RECEIVE_RECIPE = 'RECEIVE_RECIPE';
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

export function fetchRecipe(recipeName) {
  return function(dispatch) {
    dispatch(requestRecipe(recipeName));
    return fetch(`http://0.0.0.0:3000/data/recipes/${recipeName}`)
      .then(response => response.json())
      .then(json => dispatch(receiveRecipe(recipeName, json)));
  };
}
