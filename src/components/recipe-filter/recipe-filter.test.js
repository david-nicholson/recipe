import { expect } from 'chai';
import React from 'react';
import sinon from 'sinon';
import TestUtils, { Simulate } from 'react-addons-test-utils';
import RecipeFilter from './component';

describe('Component: Recipe Filter', () => {
  let filterElem;
  let spyOnChange;

  beforeEach(() => {
    spyOnChange = sinon.spy();
    const renderedComponent = TestUtils.renderIntoDocument(
      <RecipeFilter onFilterRecipes={spyOnChange} />
    );
    filterElem = TestUtils.findRenderedDOMComponentWithTag(
      renderedComponent,
      'input'
    );
  });

  it('should render correctly', () => {
    expect(filterElem.getAttribute('placeholder')).to.equal('Filter recipes');
  });

  it('should call onChange prop function when typing into the input', () => {
    Simulate.change(filterElem, { key: 'a', keyCode: 65, which: 65 });
    sinon.assert.calledOnce(spyOnChange);
    Simulate.change(filterElem, { key: '1', keyCode: 49, which: 49 });
    sinon.assert.calledTwice(spyOnChange);
  });
});
