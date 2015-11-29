import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import RecipeIngredients from '../recipe-ingredients/component';
import RecipeMethod from '../recipe-method/component';
import RecipeImage from '../recipe-image/component';

import './styles.scss';

class RecipeView extends Component {
  render() {
    const { error, recipe } = this.props;
    let content;

    if (error) {
      content = <h2 className="bbc-recipe__error">{error}</h2>;
    } else {
      content = (
        <div>
          <h1 className="bbc-recipe__heading">{recipe.name}</h1>
          <RecipeImage className="bbc-recipe__image" src={recipe.image} alt={recipe.name} />
          <div className="bbc-recipe__inner">
            <div className="bbc-recipe__summary">{recipe.summary}</div>
            <RecipeIngredients ingredients={recipe.ingredients} />
            <RecipeMethod method={recipe.method} />
          </div>
        </div>
      );
    }

    return (
      <div className="bbc-recipe">
        {content}
        <Link to={'/'} className="bbc-recipe__back-btn">Back</Link>
      </div>
    );
  }
}

RecipeView.propTypes = {
  error: PropTypes.string.isRequired,
  recipe: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    cookingTime: PropTypes.string,
    ingredients: PropTypes.array.isRequired,
    method: PropTypes.array.isRequired,
  }),
};

export default RecipeView;
