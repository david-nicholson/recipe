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

  describe('show more button', () => {

    describe('when there is no search term', () => {
      it('should display if there are more results than the default amount displayed', () => {
        const state = {
          ...recipes,
          filterTerm: '',
          noOfItemsInView: 2,
        }

        renderComponent(state);

        expect(getShowMoreElems().length).to.equal(1);
      });

      it('should not display if there are less results than the default amount displayed', () => {
        const state = {
          ...recipes,
          filterTerm: '',
          noOfItemsInView: 4,
        }

        renderComponent(state);

        expect(getShowMoreElems().length).to.equal(0);
      });
    });

    describe('when there is a search term', () => {

      const filteredResults = [1,2,3];

      it('should display if there are more results than the default amount displayed', () => {
        const state = {
          ...recipes,
          filteredResults: filteredResults,
          filterTerm: 'something',
          noOfItemsInView: 2,
        }

        renderComponent(state);

        expect(getShowMoreElems().length).to.equal(1);
      });

      it('should not display if there are less results than the default amount displayed', () => {
        const state = {
          ...recipes,
          filteredResults: filteredResults,
          filterTerm: 'something',
          noOfItemsInView: 4,
        }

        renderComponent(state);

        expect(getShowMoreElems().length).to.equal(0);
      });
    });

    it('should call to showMoreRecipes when onShowMore prop is executed', () => {
      const state = {
        ...recipes,
        filterTerm: '',
        noOfItemsInView: 2,
      }

      renderComponent(state);

      getShowMoreElems()[0].props.onShowMore();
      expect(dispatchSpy.calledOnce);
      expect(showMoreSpy.calledOnce);
    });

    function getShowMoreElems() {
      return TestUtils.scryRenderedComponentsWithType(
        renderedComponent,
        RecipeShowMore
      );
    }

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
