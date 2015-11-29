import { expect } from 'chai';
import {
  REQUEST_RECIPE,
  requestRecipe,
  RECEIVE_RECIPE,
  receiveRecipe,
  fetchRecipe,
} from './action';
import nock from 'nock';
import mockStore from '../../../test/mock-store';

describe('Actions: Recipe', () => {
  it('should return correct object when requesting a recipe', () => {
    const recipeName = 'a name';
    expect(requestRecipe(recipeName)).to.eql({type: REQUEST_RECIPE, recipeName});
  });

  it('should return correct object when receiving a recipe', () => {
    const recipeName = 'a name';
    const recipe = {a: 'recipe'};
    expect(receiveRecipe(recipeName, recipe)).to.eql({type: RECEIVE_RECIPE, recipeName, recipe: recipe});
  });

  describe('fetch recipe', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should fetch recipes', (done) => {
      const recipeName = 'a-recipe';
      const recipe = ['a recipe'];
      const expectedActions = [
        { type: REQUEST_RECIPE, recipeName },
        { type: RECEIVE_RECIPE, recipeName, recipe: { item: recipe } },
      ];
      const store = mockStore({ recipe: {} }, expectedActions, done);

      nock('http://0.0.0.0:3000/')
        .get('/data/recipes/a-recipe')
        .reply(200, { item: recipe });

      store.dispatch(fetchRecipe(recipeName));
    });
  });
});
