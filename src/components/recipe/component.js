import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import stringSanitiser from '../../utils/string-sanitiser';
import RecipeImage from '../recipe-image/component';

class Recipe extends Component {
  render() {
    return (
      <li className="bbc-recipe">
        <Link to={`/recipe/${stringSanitiser(this.props.name)}`} name={this.props.name}>
          <RecipeImage className="bbc-recipe__image" src={this.props.image} alt={this.props.name} />
          <div className="bbc-recipe__name">{this.props.name}</div>
          <div className="bbc-recipe__time">{this.props.cookingTime} mins</div>
        </Link>
      </li>
    );
  }
}

Recipe.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  cookingTime: PropTypes.string.isRequired,
};

export default Recipe;
