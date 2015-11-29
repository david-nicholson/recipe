import { expect } from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import RecipeList from './component';
import Recipe from '../recipe/component';

describe('Component: Recipe List', () => {
  let renderedComponent;
  let listElem;
  let recipeElems;
  let errorElems;

  function renderComponent(error = '') {
    renderedComponent = TestUtils.renderIntoDocument(
      <RecipeList recipes={[{name: 'recipe 1', image: 'image1', cookingTime: '30'}, {name: 'recipe 2', image: 'image2', cookingTime: '30'}]} error={error} />
    );
    recipeElems = TestUtils.scryRenderedComponentsWithType(
      renderedComponent,
      Recipe
    );
    errorElems = TestUtils.scryRenderedDOMComponentsWithClass(
      renderedComponent,
      'bbc-recipe-list__error'
    );
  }

  it('should render correctly', () => {
    renderComponent();
    listElem = TestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'bbc-recipe-list'
    );
    expect(listElem.getAttribute('class')).to.equal('bbc-recipe-list');
    expect(recipeElems.length).to.equal(2);
    expect(errorElems.length).to.equal(0);
  });

  it('should render an error message when there is an error', () => {
    renderComponent('error');
    expect(recipeElems.length).to.equal(0);
    expect(errorElems.length).to.equal(1);
  });
});
