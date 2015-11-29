import { expect } from 'chai';
import {
  REQUEST_RECIPES,
  requestRecipes,
  RECEIVE_RECIPES,
  receiveRecipes,
  fetchRecipes,
} from './recipes';
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
        { type: RECEIVE_RECIPES, recipes: recipes},
      ];
      const store = mockStore({ recipes: [] }, expectedActions, done);

      nock('http://something.com/')
        .get('/recipes')
        .reply(200, { recipes: recipes});

      store.dispatch(fetchRecipes());
    });
  });
});
