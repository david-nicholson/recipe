import React, { Component, PropTypes } from 'react';
import RecipeFilter from '../recipe-filter/component';

import './styles.scss';

class RecipeHeader extends Component {
  render() {
    return (
      <div className="bbc-recipe-header">
        <h1 className="bbc-recipe-header__title">Recipes</h1>
        <RecipeFilter onFilterRecipes={this.props.onFilterRecipes} />
        <a href="#" className="bbc-recipe-header__order" onClick={this.props.onSortRecipes}>Order by cooking time</a>
      </div>
    );
  }
}

RecipeHeader.propTypes = {
  onFilterRecipes: PropTypes.func.isRequired,
  onSortRecipes: PropTypes.func.isRequired,
};

export default RecipeHeader;
