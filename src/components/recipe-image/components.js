import React, { Component, PropTypes } from 'react';

class RecipeImage extends Component {
  render() {
    return (
      <img src={this.props.src} alt={this.props.alt} />
    );
  }
}

RecipeImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default RecipeImage;
