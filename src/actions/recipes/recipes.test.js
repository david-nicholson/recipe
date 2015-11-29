import { expect } from 'chai';
import {
  REQUEST_RECIPES,
  requestRecipes,
  RECEIVE_RECIPES,
  receiveRecipes,
  fetchRecipes,
  FILTER_RECIPES,
  filterRecipes,
  SHOW_MORE_RECIPES,
  showMoreRecipes,
  SORT_RECIPES,
  sortRecipes,
} from './action';
import nock from 'nock';
import mockStore from '../../../test/mock-store';

describe('Actions: Recipes', () => {
  it('should return correct object when requesting a recipe', () => {
    expect(requestRecipes()).to.eql({type: REQUEST_RECIPES});
  });

  it('should return correct object when receiving a recipe', () => {
    const recipes = [{a: 'recipe'}, {another: 'thing'}];
    expect(receiveRecipes(recipes)).to.eql({type: RECEIVE_RECIPES, recipes: recipes});
  });

  describe('fetch recipes', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should fetch recipes', (done) => {
      const recipes = [{a: 'recipe'}, {another: 'thing'}];
      const expectedActions = [
        { type: REQUEST_RECIPES },
        { type: RECEIVE_RECIPES, recipes: { items: recipes }},
      ];
      const store = mockStore({ recipes: [] }, expectedActions, done);

      nock('http://0.0.0.0:3000/')
        .get('/data/recipes')
        .reply(200, { items: recipes});

      store.dispatch(fetchRecipes());
    });
  });

  it('should return correct object when filterRecipes', () => {
    const searchTerm = 'something';
    expect(filterRecipes(searchTerm)).to.eql({type: FILTER_RECIPES, searchTerm});
  });

  it('should return correct object when showing more recipes', () => {
    expect(showMoreRecipes()).to.eql({type: SHOW_MORE_RECIPES});
  });

  it('should return correct object when sorting recipes', () => {
    expect(sortRecipes()).to.eql({type: SORT_RECIPES});
  });
});
