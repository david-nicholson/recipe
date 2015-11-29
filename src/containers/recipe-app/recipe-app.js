import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import action from '../../actions/recipes/recipes';
import RecipeHeader from '../../components/recipe-header/component';
import RecipeList from '../../components/recipe-list/component';
import RecipeShowMore from '../../components/recipe-show-more/component';

export class RecipeApp extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(action.fetchRecipes());
  }

  getShowMore(dispatch) {
    const filterTerm = this.props.recipes.filterTerm;
    const noOfRecipes = this.props.recipes.items.length;
    const noOfFilteredRecipes = this.props.recipes.filteredResults.length;
    const noOfItemsInView = this.props.recipes.noOfItemsInView;

    if ((!filterTerm && (noOfRecipes > noOfItemsInView)) || (filterTerm && (noOfFilteredRecipes > noOfItemsInView))) {
      return <RecipeShowMore onShowMore={() => dispatch(action.showMoreRecipes())} />;
    }
  }

  render() {
    const { dispatch, recipes } = this.props;

    return (
      <div>
        <RecipeHeader onFilterRecipes={searchTerm => dispatch(action.filterRecipes(searchTerm))} onSortRecipes={() => dispatch(action.sortRecipes())} />
        <RecipeList recipes={recipes.itemsInView} />
        {this.getShowMore(dispatch)}
      </div>
    );
  }
}

RecipeApp.propTypes = {
  dispatch: PropTypes.func.isRequired,
  recipes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    recipes: state.recipes,
  };
}

export default connect(mapStateToProps)(RecipeApp);
