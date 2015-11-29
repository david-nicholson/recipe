import {
  REQUEST_RECIPES,
  RECEIVE_RECIPES,
} from '../../actions/recipes/recipes';

const defaultNoOfItemsInView = 10;

const initialState = {
  isFetching: false,
  items: [],
  itemsInView: []
};

export default function recipes(state = initialState, action) {
  switch (action.type) {
    case REQUEST_RECIPES:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_RECIPES:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.recipes,
        itemsInView: [...action.recipes].splice(0, state.noOfItemsInView),
      });
    default:
      return state;
  }
};
