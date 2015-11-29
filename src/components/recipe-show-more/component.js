import React, { Component, PropTypes } from 'react';

import './styles.scss';

class RecipeShowMore extends Component {
  render() {
    return (
      <button className="bbc-show-more" onClick={this.props.onShowMore}>Show more recipes...</button>
    );
  }
}

RecipeShowMore.propTypes = {
  onShowMore: PropTypes.func.isRequired,
};

export default RecipeShowMore;
