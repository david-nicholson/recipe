import fetch from 'isomorphic-fetch';

export const REQUEST_RECIPES = 'REQUEST_RECIPES';
export const RECEIVE_RECIPES = 'RECEIVE_RECIPES';

export function requestRecipes() {
  return {
    type: REQUEST_RECIPES,
  }
}

export function receiveRecipes(recipes) {
  return {
    type: RECEIVE_RECIPES,
    recipes: recipes,
  }
}

export function fetchRecipes() {
  return function (dispatch) {
    dispatch(requestRecipes());
    return fetch('http://0.0.0.0:3000/data/recipes')
      .then(response => response.json())
      .then(json => dispatch(receiveRecipes(json)));
  }
}
