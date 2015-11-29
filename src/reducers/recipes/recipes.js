import {
  REQUEST_RECIPES,
  RECEIVE_RECIPES,
  FILTER_RECIPES,
  SORT_RECIPES,
} from '../../actions/recipes/recipes';

const initialState = {
  ascending: false,
  filterTerm: '',
  filteredResults: [],
  isFetching: false,
  items: [],
  itemsInView: [],
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
    case FILTER_RECIPES:
      //assuming a case insensitive search, searching all recipes and that there is pagination on the filter that resets with each type ?? NEED TO RESET
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
    case SORT_RECIPES:
      const ascending = (a, b) => parseInt(a.cookingTime) - parseInt(b.cookingTime);
      const decending = (a, b) => parseInt(b.cookingTime) - parseInt(a.cookingTime);
      const filteredRecipes = [...state.filteredResults].sort(state.ascending ? decending : ascending);
      const recipes = [...state.items].sort(state.ascending ? decending : ascending);
      const inViewItems = state.filterTerm ? filteredRecipes : recipes;

      return Object.assign({}, state, {
        filteredResults: filteredRecipes,
        items: recipes,
        itemsInView: [...inViewItems].splice(0, state.noOfItemsInView),
        ascending: !state.ascending,
      });
    default:
      return state;
  }
};
