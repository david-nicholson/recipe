import {
  REQUEST_RECIPES,
  RECEIVE_RECIPES,
  FILTER_RECIPES,
  SHOW_MORE_RECIPES,
  SORT_RECIPES,
} from '../../actions/recipes/recipes';

const defaultNoOfItemsInView = 10;

const initialState = {
  ascending: false,
  filterTerm: '',
  filteredResults: [],
  isFetching: false,
  items: [],
  itemsInView: [],
  noOfItemsInView: defaultNoOfItemsInView,
};

export default function recipes(state = initialState, action) {
  switch (action.type) {
    /* eslint-disable indent */
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
    case FILTER_RECIPES:
      // assuming a case insensitive search, searching all recipes and that there is pagination on the filter that resets with each type ?? NEED TO RESET
      const searchTerm = action.searchTerm.toLowerCase();
      let itemsInView;
      let filteredResults = [];

      if (searchTerm) {
        filteredResults = state.items.filter((recipe) => {
          return recipe.name.toLowerCase().includes(searchTerm) ||
            recipe.ingredients.filter((ingredient) => ingredient.toLowerCase().includes(searchTerm)).length > 0;
        });
        itemsInView = [...filteredResults].splice(0, defaultNoOfItemsInView);
      } else {
        filteredResults = [];
        itemsInView = [...state.items].splice(0, defaultNoOfItemsInView);
      }

      return Object.assign({}, state, {
        filterTerm: searchTerm,
        filteredResults: filteredResults,
        itemsInView: itemsInView.splice(0, defaultNoOfItemsInView),
        noOfItemsInView: defaultNoOfItemsInView,
      });
    case SHOW_MORE_RECIPES:
      const newNoOfItemsInView = state.noOfItemsInView + 10;
      const items = state.filterTerm ? state.filteredResults : state.items;

      return Object.assign({}, state, {
        noOfItemsInView: newNoOfItemsInView,
        itemsInView: [...items].splice(0, newNoOfItemsInView),
      });
    case SORT_RECIPES:
      const ascending = (a, b) => parseInt(a.cookingTime, 10) - parseInt(b.cookingTime, 10);
      const decending = (a, b) => parseInt(b.cookingTime, 10) - parseInt(a.cookingTime, 10);
      const filteredRecipes = [...state.filteredResults].sort(state.ascending ? decending : ascending);
      const recipesList = [...state.items].sort(state.ascending ? decending : ascending);
      const inViewItems = state.filterTerm ? filteredRecipes : recipesList;

      return Object.assign({}, state, {
        filteredResults: filteredRecipes,
        items: recipesList,
        itemsInView: [...inViewItems].splice(0, state.noOfItemsInView),
        ascending: !state.ascending,
      });
    default:
      return state;
    /* eslint-enable indent */
  }
}
