import { expect } from 'chai';
import React from 'react';
import sinon from 'sinon';
import TestUtils, { Simulate } from 'react-addons-test-utils';
import RecipeHeader from './component';
import RecipeFilter from '../recipe-filter/component';

describe('Component: Recipe Header', () => {
  let heading;
  let recipeFilter;
  let orderLink;
  let spyOnClick;

  beforeEach(() => {
    spyOnClick = sinon.spy();
    const renderedComponent = TestUtils.renderIntoDocument(
      <RecipeHeader onFilterRecipes={() => {}} onSortRecipes={spyOnClick} />
    );
    heading = TestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'bbc-recipe-header__title'
    );
    recipeFilter = TestUtils.scryRenderedComponentsWithType(
      renderedComponent,
      RecipeFilter
    );
    orderLink = TestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'bbc-recipe-header__order'
    );
  });

  it('should render correctly', () => {
    expect(heading.innerHTML).to.equal('Recipes');
    expect(recipeFilter.length).to.equal(1);
    expect(orderLink.innerHTML).to.equal('Order by cooking time');
  });

  it('should call onClick when ordering', () => {
    Simulate.click(orderLink);
    sinon.assert.calledOnce(spyOnClick);
  });
});
