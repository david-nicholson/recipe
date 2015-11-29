import { expect } from 'chai';
import React from 'react';
import sinon from 'sinon'
import proxyquire from 'proxyquire';
import TestUtils from 'react-addons-test-utils';
import RecipeHeader from '../../components/recipe-header/component';
import RecipeList from '../../components/recipe-list/component';
import RecipeShowMore from '../../components/recipe-show-more/component';

describe('Container: Recipe View App', () => {

  let dispatchSpy;
  let fetchRecipesSpy;
  let filterRecipesSpy;
  let sortRecipesSpy;
  let showMoreSpy;
  let renderedComponent;
  let recipeHeaderElem;
  let recipeListElem;
  const routeParams = { name: 'a-recipe' };
  const recipes = {
    itemsInView: [
      'a-recipe',
      'another recipe',
      'yet another recipe',
    ],
    items: [
      'a-recipe',
      'another recipe',
      'yet another recipe',
    ],
    filteredResults: [],
  };

  beforeEach(() => {
    dispatchSpy = sinon.spy();
    fetchRecipesSpy = sinon.spy();
    filterRecipesSpy = sinon.spy();
    sortRecipesSpy = sinon.spy();
    showMoreSpy = sinon.spy();
  });

  it('should render correctly when all required props are specified', () => {
    renderComponent(recipes);
    expect(recipeHeaderElem).to.exist;
    expect(recipeListElem.props.recipes).to.eql(recipes.itemsInView);
  });

  describe('should call a dispatch', () => {
    beforeEach(() => {
      renderComponent(recipes);
    });

    it('to fetchRecipes on component mount', () => {
      expect(dispatchSpy.calledOnce);
      expect(fetchRecipesSpy.calledOnce);
    });

    it('to filterRecipes when onFilterRecipes prop is executed', () => {
      const searchTerm = 'a search term';
      recipeHeaderElem.props.onFilterRecipes(searchTerm);
      expect(dispatchSpy.calledOnce);
      expect(filterRecipesSpy.calledWith(searchTerm).calledOnce);
    });

    it('to sortRecipes when onSortRecipes prop is executed', () => {
      recipeHeaderElem.props.onSortRecipes();
      expect(dispatchSpy.calledOnce);
      expect(sortRecipesSpy.calledOnce);
    });
  });

  afterEach(() => {
    dispatchSpy.reset();
    fetchRecipesSpy.reset();
    filterRecipesSpy.reset();
    sortRecipesSpy.reset();
    showMoreSpy.reset();
  });

  function renderComponent(state) {
    const RecipeAppMock = proxyquire.noCallThru().load('./recipe-app', {
      '../../actions/recipes/recipes': {
        fetchRecipes: fetchRecipesSpy,
        filterRecipes: filterRecipesSpy,
        sortRecipes: sortRecipesSpy,
        showMoreRecipes: showMoreSpy,
      }
    });
    renderedComponent = TestUtils.renderIntoDocument(
      <RecipeAppMock.RecipeApp recipes={state} dispatch={dispatchSpy} />
    );
    recipeHeaderElem = TestUtils.findRenderedComponentWithType(
      renderedComponent,
      RecipeHeader
    );
    recipeListElem = TestUtils.findRenderedComponentWithType(
      renderedComponent,
      RecipeList
    );
  }

});
