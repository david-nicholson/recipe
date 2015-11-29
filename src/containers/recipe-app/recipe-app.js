import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchRecipes, filterRecipes, showMoreRecipes, sortRecipes } from '../../actions/recipes/recipes';
import action from '../../actions/recipes/recipes';
import RecipeHeader from '../../components/recipe-header/component';
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
        <RecipeHeader onFilterRecipes={searchTerm => dispatch(action.filterRecipes(searchTerm))} onSortRecipes={() => dispatch(action.sortRecipes())} />
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
