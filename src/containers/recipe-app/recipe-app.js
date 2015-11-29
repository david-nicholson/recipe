import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchRecipes, filterRecipes, showMoreRecipes, sortRecipes } from '../../actions/recipes/recipes';
import action from '../../actions/recipes/recipes';
import RecipeHeader from '../../components/recipe-header/component';
import RecipeList from '../../components/recipe-list/component';
import RecipeShowMore from '../../components/recipe-show-more/component';

export class RecipeApp extends Component {

  getShowMore(dispatch) {
    const filterTerm = this.props.recipes.filterTerm;
    const noOfRecipes = this.props.recipes.items.length;
    const noOfFilteredRecipes = this.props.recipes.filteredResults.length;
    const noOfItemsInView = this.props.recipes.noOfItemsInView;

    if ((!filterTerm && (noOfRecipes > noOfItemsInView)) || (filterTerm && (noOfFilteredRecipes > noOfItemsInView))) {
      return <RecipeShowMore onShowMore={() => dispatch(action.showMoreRecipes())} />
    }
  }

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
        {this.getShowMore(dispatch)}
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
