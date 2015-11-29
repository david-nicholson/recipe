import React, { Component, PropTypes } from 'react';

import './styles.scss';

class RecipeFilter extends Component {
  render() {
    return (
      <input ref="searchTerm" className="bbc-recipe-filter" type="text" onChange={ event => this.props.onFilterRecipes(event.target.value) } placeholder="Filter recipes" />
    );
  }
}

RecipeFilter.propTypes = {
  onFilterRecipes: PropTypes.func.isRequired,
};

export default RecipeFilter;
