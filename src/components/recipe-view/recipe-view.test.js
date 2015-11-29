import { expect } from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import RecipeView from './component';
import RecipeImage from '../recipe-image/component';
import RecipeIngredients from '../recipe-ingredients/component';
import RecipeMethod from '../recipe-method/component';
import { Link } from 'react-router';

describe('Component: Recipe View', () => {
  let heading;
  let recipeImage;
  let summary;
  let ingredients;
  let method;
  let backLink;
  const recipe = {
    name: 'A recipe',
    image: 'an-image-url.com',
    summary: 'The summary of a recipe.',
    ingredients: [
      'a',
      'list',
      'of',
      'ingredients',
    ],
    method: [
      'the',
      'method',
      'to',
      'make',
      'something',
    ],
  };

  beforeEach(() => {
    const renderedComponent = TestUtils.renderIntoDocument(
      <RecipeView recipe={recipe} />
    );
    heading = TestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'bbc-recipe__heading'
    );
    recipeImage = TestUtils.findRenderedComponentWithType(
      renderedComponent,
      RecipeImage
    );
    summary = TestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'bbc-recipe__summary'
    );
    ingredients = TestUtils.findRenderedComponentWithType(
      renderedComponent,
      RecipeIngredients
    );
    method = TestUtils.findRenderedComponentWithType(
      renderedComponent,
      RecipeMethod
    );
    backLink = TestUtils.findRenderedComponentWithType(
      renderedComponent,
      Link
    );
  });

  it('should render correctly', () => {
    expect(heading.innerHTML).to.equal(recipe.name);
    expect(recipeImage.props.className).to.equal('bbc-recipe__image');
    expect(recipeImage.props.src).to.equal(recipe.image);
    expect(recipeImage.props.alt).to.equal(recipe.name);
    expect(summary.innerHTML).to.equal(recipe.summary);
    expect(ingredients.props.ingredients).to.equal(recipe.ingredients);
    expect(method.props.method).to.equal(recipe.method);
    expect(backLink.props.to).to.equal('/');
    expect(backLink.props.children).to.equal('Back');
  });
});
