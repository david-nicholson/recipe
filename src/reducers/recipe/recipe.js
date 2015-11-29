import { REQUEST_RECIPE, RECEIVE_RECIPE } from '../../actions/recipe/recipe';

const initialState = {
  isFetching: false,
  item: {
    name: '',
    image: '',
    cookingTime: '',
    ingredients: [],
    method: [],
  },
};

export default function recipe(state = initialState, action) {
  switch (action.type) {
    case REQUEST_RECIPE:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_RECIPE:
      return Object.assign({}, state, {
        isFetching: false,
        item: action.recipe,
      });
    default:
      return state;
  }
};