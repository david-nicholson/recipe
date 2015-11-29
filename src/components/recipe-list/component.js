import React, { Component, PropTypes } from 'react';
import Recipe from '../recipe/component';

class RecipeList extends Component {
  render() {
    return (
      <ul className="bbc-recipe-list">
        {this.props.recipes.map((recipe) => <Recipe key={recipe.name} {...recipe} /> )}
      </ul>
    );
  }
}

RecipeList.propTypes = {
  recipes: PropTypes.array.isRequired,
};

export default RecipeList;
