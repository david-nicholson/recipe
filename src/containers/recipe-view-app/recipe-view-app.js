import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import action from '../../actions/recipe/recipe';
import RecipeView from '../../components/recipe-view/component';

export class RecipeViewApp extends Component {

  componentDidMount() {
    this.props.dispatch(action.fetchRecipe(this.props.routeParams.name));
  }

  render() {
    return (
      <RecipeView recipe={this.props.recipe.item} />
    );
  }
}

RecipeViewApp.propTypes = {
  dispatch: PropTypes.func.isRequired,
  recipe: PropTypes.object.isRequired,
  routeParams: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    recipe: state.recipe,
  };
}

export default connect(mapStateToProps)(RecipeViewApp);
