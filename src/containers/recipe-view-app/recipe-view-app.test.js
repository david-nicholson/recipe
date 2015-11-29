import { expect } from 'chai';
import React from 'react';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import TestUtils from 'react-addons-test-utils';
import RecipeView from '../../components/recipe-view/component';

describe('Container: Recipe View App', () => {
  let recipeViewElem;
  let dispatchSpy;
  let fetchRecipeSpy;
  const routeParams = { name: 'a-recipe' };
  const recipe = {
    item: {
      name: 'A recipe',
      image: 'an-image-url.com',
      summary: 'The summary of a recipe.',
      ingredients: [
        'a',
        'list',
        'of',
        'ingredients',
      ],
      method: [
        'the',
        'method',
        'to',
        'make',
        'something',
      ],
    },
  };

  beforeEach(() => {
    dispatchSpy = sinon.spy();
    fetchRecipeSpy = sinon.spy();
    const RecipeViewAppMock = proxyquire.noCallThru().load('./container', {
      '../../actions/recipe/action': { fetchRecipe: fetchRecipeSpy },
    });
    const renderedComponent = TestUtils.renderIntoDocument(
      <RecipeViewAppMock.RecipeViewApp recipe={recipe} dispatch={dispatchSpy} routeParams={routeParams} />
    );
    recipeViewElem = TestUtils.findRenderedComponentWithType(
      renderedComponent,
      RecipeView
    );
  });

  it('should render correctly when all required props are specified', () => {
    expect(recipeViewElem.props.recipe).to.eql(recipe.item);
  });

  it('should fire a dispatch to fetchRecipe on component mount', () => {
    expect(dispatchSpy.calledOnce);
    expect(fetchRecipeSpy.withArgs(routeParams).calledOnce);
  });
});
