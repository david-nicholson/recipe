import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import stringSanitiser from '../../utils/string-sanitiser';
import RecipeImage from '../recipe-image/component';

import './styles.scss';

class Recipe extends Component {
  render() {
    return (
      <li className="bbc-recipe-item" key={Math.random()}>
        <Link className="bbc-recipe-item__link" to={`/recipe/${stringSanitiser(this.props.name)}`} name={this.props.name}>
          <RecipeImage className="bbc-recipe-item__image" src={this.props.image} alt={this.props.name} />
          <div className="bbc-recipe-item__name">{this.props.name}</div>
          <div className="bbc-recipe-item__time">{this.props.cookingTime} mins</div>
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
