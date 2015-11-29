import React, { Component, PropTypes } from 'react';

class RecipeIngredients extends Component {
  render() {
    return (
      <div className="bbc-ingredients">
        <h2 className="bbc-ingredients__heading">Ingredients</h2>
        <ul className="bbc-ingredients__list">
          {this.props.ingredients.map((ingredient) => {
            if (typeof ingredient === 'object') {
              const subGroup = ingredient.ingredients.map((groupIngredient) => <li className="bbc-ingredients__item bbc-ingredients__item--sub">{groupIngredient}</li>);
              subGroup.unshift(<li className="bbc-ingredients__item bbc-ingredients__item--group-heading">{ingredient.group}</li>);
              return subGroup;
            } else { // eslint-disable-line no-else-return
              return <li className="bbc-ingredients__item">{ingredient}</li>;
            }
          })}
        </ul>
      </div>
    );
  }
}

RecipeIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string.optional).isRequired,
};

export default RecipeIngredients;
