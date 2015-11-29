import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import RecipeIngredients from '../recipe-ingredients/component';
import RecipeMethod from '../recipe-method/component';
import RecipeImage from '../recipe-image/component';

class RecipeView extends Component {
  render() {
    return (
      <div className="bbc-recipe">
        <h1 className="bbc-recipe__heading">{this.props.recipe.name}</h1>
        <RecipeImage className="bbc-recipe__image" src={this.props.recipe.image} alt={this.props.recipe.name} />
        <div className="bbc-recipe__inner">
          <div className="bbc-recipe__summary">{this.props.recipe.summary}</div>
          <RecipeIngredients ingredients={this.props.recipe.ingredients} />
          <RecipeMethod method={this.props.recipe.method} />
        </div>
        <Link to={'/'} className="bbc-recipe__back-btn">Back</Link>
      </div>
    );
  }
}

RecipeView.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    cookingTime: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string.isOptional).isRequired,
    method: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  })),
};

export default RecipeView;
