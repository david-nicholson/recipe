import {
  REQUEST_RECIPE,
  RECEIVE_RECIPE,
  REQUEST_RECIPE_FAILURE,
 } from '../../actions/recipe/action';

const initialState = {
  error: '',
  isFetching: false,
  item: {
    name: '',
    image: '',
    summary: '',
    cookingTime: '',
    ingredients: [],
    method: [],
  },
};

export default function recipe(state = initialState, action) {
  switch (action.type) {
    /* eslint-disable indent */
    case REQUEST_RECIPE:
      return Object.assign({}, state, {
        error: '',
        isFetching: true,
      });
    case RECEIVE_RECIPE:
      return Object.assign({}, state, {
        isFetching: false,
        item: action.recipe,
      });
    case REQUEST_RECIPE_FAILURE:
      return Object.assign({}, state, {
        error: 'Sorry, this recipe doesn\'t exist or may have been removed',
        isFetching: false,
      });
    default:
      return state;
    /* eslint-enable indent */
  }
}
