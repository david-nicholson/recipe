import React, { Component, PropTypes } from 'react';

class RecipeMethod extends Component {
  render() {
    return (
      <div className="bbc-method">
        <h2 className="bbc-method__heading">Preparation method</h2>
        <ol className="bbc-method__list">
          {this.props.method.map((step, index) => <li className="bbc-method__step" key={index}>{step}</li>)}
        </ol>
      </div>
    );
  }
}

// RecipeViewApp.propTypes = {
//   recipe: PropTypes.object.isRequired
// };

export default RecipeMethod;
