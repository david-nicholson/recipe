import { expect } from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import RecipeIngredients from './component';

describe('Component: Recipe ingredients', () => {
  let renderedComponent;
  let headingElem;
  let ingredientElems;
  const ingredients = ['something', 'something else'];

  function renderComponent(ingredientList) {
    renderedComponent = TestUtils.renderIntoDocument(
      <RecipeIngredients ingredients={ingredientList} />
    );
    headingElem = TestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'bbc-ingredients__heading'
    );
    ingredientElems = TestUtils.scryRenderedDOMComponentsWithClass(
      renderedComponent,
      'bbc-ingredients__item'
    );
  }

  describe('given a flat array', () => {
    it('should render correctly', () => {
      renderComponent(ingredients);

      expect(headingElem.innerHTML).to.equal('Ingredients');
      expect(ingredientElems.length).to.equal(2);
    });
  });

  describe('given an array of different types', () => {
    const groupTitle = 'a group';
    const anotherGroupTitle = 'a group';
    const lastIngredient = 'an ingredient';
    const ingredientGroups = [
      {
        group: groupTitle,
        ingredients: ingredients,
      }, {
        group: anotherGroupTitle,
        ingredients: ingredients,
      },
      lastIngredient,
    ];

    it('should render correctly', () => {
      renderComponent(ingredientGroups);

      const groupHeadingElems = TestUtils.scryRenderedDOMComponentsWithClass(
        renderedComponent,
        'bbc-ingredients__item--group-heading'
      );
      const groupIngredientElems = TestUtils.scryRenderedDOMComponentsWithClass(
        renderedComponent,
        'bbc-ingredients__item--sub'
      );

      expect(groupHeadingElems.length).to.equal(2);
      expect(groupHeadingElems[0].innerHTML).to.equal(groupTitle);
      expect(groupHeadingElems[1].innerHTML).to.equal(anotherGroupTitle);
      expect(groupIngredientElems.length).to.equal(4);
      expect(groupIngredientElems[0].innerHTML).to.equal(ingredients[0]);
      expect(groupIngredientElems[1].innerHTML).to.equal(ingredients[1]);
      expect(groupIngredientElems[2].innerHTML).to.equal(ingredients[0]);
      expect(groupIngredientElems[3].innerHTML).to.equal(ingredients[1]);
      expect(ingredientElems[6].innerHTML).to.equal(lastIngredient);
      expect(ingredientElems.length).to.equal(7);
    });
  });
});
