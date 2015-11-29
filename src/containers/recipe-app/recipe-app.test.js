import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchRecipes } from '../../actions/recipes/recipes';
import action from '../../actions/recipes/recipes';
import RecipeList from '../../components/recipe-list/component';

export class RecipeApp extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(action.fetchRecipes());
  }

  render() {
    const { dispatch, recipes } = this.props;

    return (
      <div>
        <RecipeList recipes={this.props.recipes.itemsInView} />
      </div>
    );
  }
}

RecipeApp.propTypes = {
  recipes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    recipes: state.recipes,
  };
}

export default connect(mapStateToProps)(RecipeApp);
