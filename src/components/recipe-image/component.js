import React, { Component, PropTypes } from 'react';

class RecipeImage extends Component {
  render() {
    return (
      <img className={this.props.className} src={this.props.src} alt={this.props.alt} />
    );
  }
}

RecipeImage.propTypes = {
  className: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default RecipeImage;
