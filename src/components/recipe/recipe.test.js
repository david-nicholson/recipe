import { expect } from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Recipe from './component';
import RecipeImage from '../recipe-image/component';

describe('Component: Recipe', () => {
  const name = {};
  const image = {};
  const time = {};

  beforeEach(() => {
    name.value = 'A recipe';
    image.value = 'http://animageurl.com';
    time.value = '30';

    const renderedComponent = TestUtils.renderIntoDocument(
      <Recipe name={name.value} image={image.value} cookingTime={time.value} />
    );
    name.elem = TestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'bbc-recipe-item__name'
    );
    image.elem = TestUtils.findRenderedComponentWithType(
      renderedComponent,
      RecipeImage
    );
    time.elem = TestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'bbc-recipe-item__time'
    );
  });

  it('should render correctly when all required props are specified', () => {
    const timeElem = time.elem.querySelectorAll('span');

    expect(name.elem.innerHTML).to.equal(name.value);
    expect(image.elem.props.src).to.equal(image.value);
    expect(image.elem.props.alt).to.equal(name.value);
    expect(timeElem[0].innerHTML).to.equal(time.value);
    expect(timeElem[1].innerHTML).to.equal(' mins');
  });
});
