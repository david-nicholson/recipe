import { expect } from 'chai';
import {
  REQUEST_RECIPE,
  RECEIVE_RECIPE,
  REQUEST_RECIPE_FAILURE,
} from '../../actions/recipe/action';
import recipe from './recipe';

describe('Reducer: Recipe', () => {
  describe(REQUEST_RECIPE, () => {
    it('should update state', () => {
      const requestRecipe = recipe({ isFetching: false }, { type: REQUEST_RECIPE });
      expect(requestRecipe.isFetching).to.equal(true);
      expect(requestRecipe.error).to.equal('');
    });
  });

  describe(RECEIVE_RECIPE, () => {
    it('should update state', () => {
      const aRecipe = { a: 'recipe' };
      const requestRecipe = recipe({ isFetching: true }, { type: RECEIVE_RECIPE, recipe: aRecipe});
      expect(requestRecipe.isFetching).to.equal(false);
      expect(requestRecipe.item).to.eql(aRecipe);
    });
  });

  describe(REQUEST_RECIPE_FAILURE, () => {
    it('should update the state', () => {
      const requestRecipe = recipe({ isFetching: true }, { type: REQUEST_RECIPE_FAILURE });
      expect(requestRecipe.isFetching).to.equal(false);
      expect(requestRecipe.error).to.equal('Sorry, this recipe doesn\'t exist or may have been removed');
    });
  });
});
