import { expect } from 'chai';
import React from 'react';
import sinon from 'sinon';
import TestUtils, { Simulate } from 'react-addons-test-utils';
import RecipeShowMore from './component';

describe('Component: Recipe Show More', () => {
  let button;
  let spyOnClick;

  beforeEach(() => {
    spyOnClick = sinon.spy();
    const renderedComponent = TestUtils.renderIntoDocument(
      <RecipeShowMore onShowMore={spyOnClick} />
    );
    button = TestUtils.findRenderedDOMComponentWithTag(
      renderedComponent,
      'button'
    );
  });

  it('should render correctly', () => {
    expect(button.innerHTML).to.equal('Show more recipes...');
  });

  it('should call onClick prop function when clicked', () => {
    Simulate.click(button);
    sinon.assert.calledOnce(spyOnClick);
  });
});
