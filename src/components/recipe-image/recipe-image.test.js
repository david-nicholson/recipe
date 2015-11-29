import { expect } from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import RecipeImage from './component';

describe('Component: Recipe Image', () => {
  let imageElem;
  let src;
  let alt;

  beforeEach(() => {
    src = 'http://animageurl.com';
    alt = 'This is some alt text';

    const renderedComponent = TestUtils.renderIntoDocument(
      <RecipeImage src={src} alt={alt} />
    );
    imageElem = TestUtils.findRenderedDOMComponentWithTag(
      renderedComponent,
      'img'
    );
  });

  it('should render correctly when all required props are specified', () => {
    expect(imageElem.getAttribute('src')).to.equal(src);
    expect(imageElem.getAttribute('alt')).to.equal(alt);
  });
});
