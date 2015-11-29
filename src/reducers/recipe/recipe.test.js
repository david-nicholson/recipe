import { expect } from 'chai';
import {
  REQUEST_RECIPE,
  RECEIVE_RECIPE,
} from '../../actions/recipe/action';
import recipe from './recipe';

describe('Reducer: Recipe', () => {
  describe(REQUEST_RECIPE, () => {
    it('should update the fetching state', () => {
      const requestRecipe = recipe({ isFetching: false }, { type: REQUEST_RECIPE });
      expect(requestRecipe.isFetching).to.equal(true);
    });
  });

  describe(RECEIVE_RECIPE, () => {
    it('should update the fetching state', () => {
      const requestRecipe = recipe({ isFetching: true }, { type: RECEIVE_RECIPE, recipe: { a: 'recipe' } });
      expect(requestRecipe.isFetching).to.equal(false);
      expect(requestRecipe.item).to.eql({ a: 'recipe' });
    });
  });
});
