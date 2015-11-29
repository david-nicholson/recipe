import React, { Component, PropTypes } from 'react';

import './styles.scss';

class RecipeIngredients extends Component {
  render() {
    return (
      <div className="bbc-ingredients">
        <h2 className="bbc-ingredients__heading">Ingredients</h2>
        <ul className="bbc-ingredients__list">
          {this.props.ingredients.map((ingredient) => {
            if (typeof ingredient === 'object') {
              const subGroup = ingredient.ingredients.map((groupIngredient) => <li className="bbc-ingredients__item bbc-ingredients__item--sub" key={Math.random()}>{groupIngredient}</li>);
              subGroup.unshift(<li className="bbc-ingredients__item bbc-ingredients__item--group-heading" key={Math.random()}>{ingredient.group}</li>);
              return subGroup;
            } else { // eslint-disable-line no-else-return
              return <li className="bbc-ingredients__item" key={Math.random()}>{ingredient}</li>;
            }
          })}
        </ul>
      </div>
    );
  }
}

RecipeIngredients.propTypes = {
  ingredients: PropTypes.array.isRequired,
};

export default RecipeIngredients;
