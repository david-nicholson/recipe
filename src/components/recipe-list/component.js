import React, { Component, PropTypes } from 'react';
import Recipe from '../recipe/component';

import './styles.scss';

class RecipeList extends Component {
  render() {
    let content;

    if (this.props.error) {
      content = <h2 className="bbc-recipe-list__error">{this.props.error}</h2>;
    } else {
      content = (
        <ul className="bbc-recipe-list">
          {this.props.recipes.map((recipe) => <Recipe key={recipe.name} {...recipe} /> )}
        </ul>
      );
    }

    return content;
  }
}

RecipeList.propTypes = {
  error: PropTypes.string.isRequired,
  recipes: PropTypes.array.isRequired,
};

export default RecipeList;
