import { expect } from 'chai';
import {
  REQUEST_RECIPES,
  RECEIVE_RECIPES,
  FILTER_RECIPES,
  SHOW_MORE_RECIPES,
  SORT_RECIPES
} from '../../actions/recipes/recipes';
import recipes from './recipes';
import filterFixture from '../../../test/fixtures/filter'

describe('Reducer: Recipes', () => {
  describe(REQUEST_RECIPES, () => {
    it('should update the fetching state', () => {
      const requestRecipes = recipes({ isFetching: false }, { type: REQUEST_RECIPES });
      expect(requestRecipes.isFetching).to.equal(true);
    });
  });

  describe(RECEIVE_RECIPES, () => {
    it('should get items and puts the correct amount of items in view', () => {
      const items = [1,2,3,4,5,6];
      const requestRecipes = recipes({
        isFetching: true,
        noOfItemsInView: 3,
      }, {
        type: RECEIVE_RECIPES,
        recipes: items
      });

      expect(requestRecipes.isFetching).to.equal(false);
      expect(requestRecipes.items).to.equal(items);
      expect(requestRecipes.itemsInView).to.eql(items.splice(0, 3));
    });
  });

  describe('DEFAULT', () => {
    it('should return default state if action not recognised', () => {
      expect(recipes({something: 'else'}, {type: 'something'})).to.eql({something: 'else'});
    });
  });
});
