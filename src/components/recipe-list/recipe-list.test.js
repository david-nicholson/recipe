import { expect } from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import RecipeList from './component';
import Recipe from '../recipe/component';

describe('Component: Recipe List', () => {

  let listElem;
  let recipeElems;

  beforeEach(() => {
    const renderedComponent = TestUtils.renderIntoDocument(
      <RecipeList recipes={[{name: 'recipe 1', image: 'image1', cookingTime: '30'}, {name: 'recipe 2', image: 'image2', cookingTime: '30'}]} />
    );
    listElem = TestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'bbc-recipe-list'
    );
    recipeElems = TestUtils.scryRenderedComponentsWithType(
      renderedComponent,
      Recipe
    );
  });

  it('should render correctly', () => {
    expect(listElem.getAttribute('class')).to.equal('bbc-recipe-list');
    expect(recipeElems.length).to.equal(2);
  });
});
