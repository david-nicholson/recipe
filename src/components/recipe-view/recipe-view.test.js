import { expect } from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import RecipeView from './component';
import RecipeImage from '../recipe-image/component';
import RecipeIngredients from '../recipe-ingredients/component';
import RecipeMethod from '../recipe-method/component';
import { Link } from 'react-router';

describe('Component: Recipe View', () => {
  let renderedComponent;
  let backLink;
  let errorElems;
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

  function renderComponent(error = '') {
    renderedComponent = TestUtils.renderIntoDocument(
      <RecipeView recipe={recipe} error={error} />
    );
    backLink = TestUtils.findRenderedComponentWithType(
      renderedComponent,
      Link
    );
    errorElems = TestUtils.scryRenderedDOMComponentsWithClass(
      renderedComponent,
      'bbc-recipe__error'
    );
  }

  it('should render correctly', () => {
    renderComponent();

    const heading = TestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'bbc-recipe__heading'
    );
    const recipeImage = TestUtils.findRenderedComponentWithType(
      renderedComponent,
      RecipeImage
    );
    const summary = TestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'bbc-recipe__summary'
    );
    const ingredients = TestUtils.findRenderedComponentWithType(
      renderedComponent,
      RecipeIngredients
    );
    const method = TestUtils.findRenderedComponentWithType(
      renderedComponent,
      RecipeMethod
    );

    expect(heading.innerHTML).to.equal(recipe.name);
    expect(recipeImage.props.className).to.equal('bbc-recipe__image');
    expect(recipeImage.props.src).to.equal(recipe.image);
    expect(recipeImage.props.alt).to.equal(recipe.name);
    expect(summary.innerHTML).to.equal(recipe.summary);
    expect(ingredients.props.ingredients).to.equal(recipe.ingredients);
    expect(method.props.method).to.equal(recipe.method);
    expect(backLink.props.to).to.equal('/');
    expect(backLink.props.children).to.equal('Back');
    expect(errorElems.length).to.equal(0);
  });

  it('should render an error message when there is an error', () => {
    renderComponent('error');
    expect(backLink.props.to).to.equal('/');
    expect(errorElems.length).to.equal(1);
  });
});
