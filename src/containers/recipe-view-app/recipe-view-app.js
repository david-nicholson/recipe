import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import action from '../../actions/recipe/recipe';
import RecipeView from '../../components/recipe-view/component';

export class RecipeViewApp extends Component {

  componentDidMount() {
    const { dispatch, recipe } = this.props;
    dispatch(action.fetchRecipe(this.props.routeParams.name));
  }

  render() {
    const { dispatch, recipe } = this.props;

    return (
      <RecipeView recipe={recipe.item} />
    );
  }
}

RecipeViewApp.propTypes = {
  recipe: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    recipe: state.recipe,
  };
}

export default connect(mapStateToProps)(RecipeViewApp);
