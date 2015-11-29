import { expect } from 'chai';
import {
  REQUEST_RECIPES,
  RECEIVE_RECIPES,
  REQUEST_RECIPES_FAILURE,
  FILTER_RECIPES,
  SHOW_MORE_RECIPES,
  SORT_RECIPES,
} from '../../actions/recipes/action';
import recipes from './recipes';
import filterFixture from '../../../test/fixtures/filter';

describe('Reducer: Recipes', () => {
  describe(REQUEST_RECIPES, () => {
    it('should update the fetching state', () => {
      const requestRecipes = recipes({ isFetching: false }, { type: REQUEST_RECIPES });
      expect(requestRecipes.isFetching).to.equal(true);
    });
  });

  describe(RECEIVE_RECIPES, () => {
    it('should get items and puts the correct amount of items in view', () => {
      const items = [1, 2, 3, 4, 5, 6];
      const requestRecipes = recipes({
        isFetching: true,
        noOfItemsInView: 3,
      }, {
        type: RECEIVE_RECIPES,
        recipes: items,
      });

      expect(requestRecipes.isFetching).to.equal(false);
      expect(requestRecipes.items).to.equal(items);
      expect(requestRecipes.itemsInView).to.eql(items.splice(0, 3));
    });
  });

  describe(REQUEST_RECIPES_FAILURE, () => {
    it('should update the state', () => {
      const requestRecipes = recipes({ isFetching: true }, { type: REQUEST_RECIPES_FAILURE });
      expect(requestRecipes.isFetching).to.equal(false);
      expect(requestRecipes.error).to.equal('Sorry, we currently have no recipes for you');
    });
  });

  describe(FILTER_RECIPES, () => {
    function getFilteredRecipes(searchTerm, fixture = filterFixture) {
      return recipes(fixture, { type: FILTER_RECIPES, searchTerm: searchTerm });
    }

    it('should return all recipes when no search is specified', () => {
      const filteredRecipes = getFilteredRecipes('');

      expect(filteredRecipes.filteredResults.length).to.equal(0);
      expect(filteredRecipes.items.length).to.equal(3);
      expect(filteredRecipes.items[0].name).to.equal('Sapphire\'s stir-fry');
      expect(filteredRecipes.items[1].name).to.equal('Easy chocolate cake');
      expect(filteredRecipes.items[2].name).to.equal('Chicken Kiev');
      expect(filteredRecipes.noOfItemsInView).to.equal(10);
    });

    describe('should return the correct recipes when a search is specified', () => {
      it('with a single character', () => {
        let filteredRecipes = getFilteredRecipes('k');
        expect(filteredRecipes.filteredResults.length).to.equal(2);
        expect(filteredRecipes.itemsInView.length).to.equal(2);
        expect(filteredRecipes.filteredResults[0].name).to.equal('Easy chocolate cake');
        expect(filteredRecipes.filteredResults[1].name).to.equal('Chicken Kiev');
        expect(filteredRecipes.noOfItemsInView).to.equal(10);

        filteredRecipes = getFilteredRecipes('K');
        expect(filteredRecipes.filteredResults.length).to.equal(2);
        expect(filteredRecipes.itemsInView.length).to.equal(2);
        expect(filteredRecipes.filteredResults[0].name).to.equal('Easy chocolate cake');
        expect(filteredRecipes.filteredResults[1].name).to.equal('Chicken Kiev');
        expect(filteredRecipes.noOfItemsInView).to.equal(10);
      });

      it('with multiple characters', () => {
        let filteredRecipes = getFilteredRecipes('Chicken');
        expect(filteredRecipes.filteredResults.length).to.equal(1);
        expect(filteredRecipes.itemsInView.length).to.equal(1);
        expect(filteredRecipes.filteredResults[0].name).to.equal('Chicken Kiev');
        expect(filteredRecipes.noOfItemsInView).to.equal(10);

        filteredRecipes = getFilteredRecipes('Courgette');
        expect(filteredRecipes.filteredResults.length).to.equal(1);
        expect(filteredRecipes.itemsInView.length).to.equal(1);
        expect(filteredRecipes.filteredResults[0].name).to.equal('Sapphire\'s stir-fry');
        expect(filteredRecipes.noOfItemsInView).to.equal(10);
      });

      it('with special characters', () => {
        let filteredRecipes = getFilteredRecipes('\'');
        expect(filteredRecipes.filteredResults.length).to.equal(1);
        expect(filteredRecipes.itemsInView.length).to.equal(1);
        expect(filteredRecipes.filteredResults[0].name).to.equal('Sapphire\'s stir-fry');
        expect(filteredRecipes.noOfItemsInView).to.equal(10);

        filteredRecipes = getFilteredRecipes('-');
        expect(filteredRecipes.filteredResults.length).to.equal(2);
        expect(filteredRecipes.itemsInView.length).to.equal(2);
        expect(filteredRecipes.filteredResults[0].name).to.equal('Sapphire\'s stir-fry');
        expect(filteredRecipes.filteredResults[1].name).to.equal('Easy chocolate cake');
        expect(filteredRecipes.noOfItemsInView).to.equal(10);
      });

      it('that doesnt exist', () => {
        const filteredRecipes = getFilteredRecipes('Lasagane');

        expect(filteredRecipes.filteredResults.length).to.equal(0);
        expect(filteredRecipes.itemsInView.length).to.equal(0);
        expect(filteredRecipes.noOfItemsInView).to.equal(10);
      });

      it('doesnt show more than 10 results', () => {
        const items = {items: [{name: 'a', ingredients: ['a']}, {name: 'a', ingredients: ['a']}, {name: 'a', ingredients: ['a']}, {name: 'a', ingredients: ['a']}, {name: 'a', ingredients: ['a']}, {name: 'a', ingredients: ['a']}, {name: 'a', ingredients: ['a']}, {name: 'a', ingredients: ['a']}, {name: 'a', ingredients: ['a']}, {name: 'a', ingredients: ['a']}, {name: 'a', ingredients: ['a']}, {name: 'a', ingredients: ['a']}]};
        const filteredRecipes = getFilteredRecipes('a', items);
        expect(filteredRecipes.itemsInView.length).to.equal(10);
        expect(filteredRecipes.noOfItemsInView).to.equal(10);
      });
    });
  });

  describe(SHOW_MORE_RECIPES, () => {
    it('should show more recipes', () => {
      const showMoreRecipes = recipes({
        filterTerm: '',
        items: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
        noOfItemsInView: 2,
      }, {
        type: SHOW_MORE_RECIPES,
      });

      expect(showMoreRecipes.noOfItemsInView).to.equal(12);
      expect(showMoreRecipes.itemsInView).to.eql([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    });

    it('should show more filtered results', () => {
      const showMoreRecipes = recipes({
        filterTerm: 'something',
        filteredResults: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        items: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
        noOfItemsInView: 2,
      }, {
        type: SHOW_MORE_RECIPES,
      });

      expect(showMoreRecipes.noOfItemsInView).to.equal(12);
      expect(showMoreRecipes.itemsInView).to.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    });
  });

  describe(SORT_RECIPES, () => {
    it('should sort recipes in ascending order', () => {
      const showMoreRecipes = recipes({
        ascending: false,
        filterTerm: '',
        filteredResults: [],
        items: [{cookingTime: '4'}, {cookingTime: '1'}, {cookingTime: '2'}, {cookingTime: '1'}],
        noOfItemsInView: 2,
      }, {
        type: SORT_RECIPES,
      });

      expect(showMoreRecipes.items).to.eql([{cookingTime: '1'}, {cookingTime: '1'}, {cookingTime: '2'}, {cookingTime: '4'}]);
      expect(showMoreRecipes.itemsInView).to.eql([{cookingTime: '1'}, {cookingTime: '1'}]);
      expect(showMoreRecipes.ascending).to.equal(true);
    });

    it('should sort recipes in descending order when already in ascending order', () => {
      const showMoreRecipes = recipes({
        ascending: true,
        filterTerm: '',
        filteredResults: [],
        items: [{cookingTime: '1'}, {cookingTime: '1'}, {cookingTime: '2'}, {cookingTime: '4'}],
        noOfItemsInView: 2,
      }, {
        type: SORT_RECIPES,
      });

      expect(showMoreRecipes.items).to.eql([{cookingTime: '4'}, {cookingTime: '2'}, {cookingTime: '1'}, {cookingTime: '1'}]);
      expect(showMoreRecipes.itemsInView).to.eql([{cookingTime: '4'}, {cookingTime: '2'}]);
      expect(showMoreRecipes.ascending).to.equal(false);
    });

    it('should sort recipes in ascending order when a filter is applied', () => {
      const showMoreRecipes = recipes({
        ascending: false,
        filterTerm: 'something',
        filteredResults: [{cookingTime: '3'}, {cookingTime: '1'}, {cookingTime: '5'}, {cookingTime: '2'}],
        items: [{cookingTime: '4'}, {cookingTime: '1'}, {cookingTime: '2'}, {cookingTime: '1'}],
        noOfItemsInView: 2,
      }, {
        type: SORT_RECIPES,
      });

      expect(showMoreRecipes.filteredResults).to.eql([{cookingTime: '1'}, {cookingTime: '2'}, {cookingTime: '3'}, {cookingTime: '5'}]);
      expect(showMoreRecipes.items).to.eql([{cookingTime: '1'}, {cookingTime: '1'}, {cookingTime: '2'}, {cookingTime: '4'}]);
      expect(showMoreRecipes.itemsInView).to.eql([{cookingTime: '1'}, {cookingTime: '2'}]);
      expect(showMoreRecipes.ascending).to.equal(true);
    });

    it('should sort recipes in descending order when a filter is applied and ran twice', () => {
      const showMoreRecipes = recipes({
        ascending: true,
        filterTerm: 'something',
        filteredResults: [{cookingTime: '3'}, {cookingTime: '1'}, {cookingTime: '5'}, {cookingTime: '2'}],
        items: [{cookingTime: '4'}, {cookingTime: '1'}, {cookingTime: '2'}, {cookingTime: '1'}],
        noOfItemsInView: 2,
      }, {
        type: SORT_RECIPES,
      });

      expect(showMoreRecipes.filteredResults).to.eql([{cookingTime: '5'}, {cookingTime: '3'}, {cookingTime: '2'}, {cookingTime: '1'}]);
      expect(showMoreRecipes.items).to.eql([{cookingTime: '4'}, {cookingTime: '2'}, {cookingTime: '1'}, {cookingTime: '1'}]);
      expect(showMoreRecipes.itemsInView).to.eql([{cookingTime: '5'}, {cookingTime: '3'}]);
      expect(showMoreRecipes.ascending).to.equal(false);
    });
  });

  describe('DEFAULT', () => {
    it('should return default state if action not recognised', () => {
      expect(recipes({something: 'else'}, {type: 'something'})).to.eql({something: 'else'});
    });
  });
});
