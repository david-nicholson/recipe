import { expect } from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import RecipeMethod from './component';

describe('Component: Recipe Method', () => {

  let methodHeading;
  let methodElems;

  beforeEach(() => {
    const renderedComponent = TestUtils.renderIntoDocument(
      <RecipeMethod method={[0,1,2,3]} />
    );
    methodHeading = TestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'bbc-method__heading'
    );
    methodElems = TestUtils.scryRenderedDOMComponentsWithClass(
      renderedComponent,
      'bbc-method__step'
    );
  });

  it('should render correctly', () => {
    expect(methodHeading.innerHTML).to.equal('Preparation method');
    expect(methodElems.length).to.equal(4);
    expect(methodElems[0].innerHTML).to.equal('0');
    expect(methodElems[1].innerHTML).to.equal('1');
    expect(methodElems[2].innerHTML).to.equal('2');
    expect(methodElems[3].innerHTML).to.equal('3');
  });
});
