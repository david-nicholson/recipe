import React, { Component, PropTypes } from 'react';

import './styles.scss';

class RecipeMethod extends Component {
  render() {
    return (
      <div className="bbc-method">
        <h2 className="bbc-method__heading">Preparation method</h2>
        <ol className="bbc-method__list">
          {this.props.method.map((step) => <li className="bbc-method__step" key={Math.random()}>{step}</li>)}
        </ol>
      </div>
    );
  }
}

RecipeMethod.propTypes = {
  method: PropTypes.array.isRequired,
};

export default RecipeMethod;
