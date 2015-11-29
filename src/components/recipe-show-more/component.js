import React, { Component, PropTypes } from 'react';

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
