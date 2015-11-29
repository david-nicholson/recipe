import { combineReducers } from 'redux';
import recipe from './recipe/recipe';
import recipes from './recipes/recipes';

const reducers = combineReducers({
  recipe,
  recipes,
});

export default reducers;
