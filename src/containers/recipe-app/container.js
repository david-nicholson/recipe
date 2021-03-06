import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchRecipes, filterRecipes, showMoreRecipes, sortRecipes } from '../../actions/recipes/action';
import RecipeHeader from '../../components/recipe-header/component';
import RecipeList from '../../components/recipe-list/component';
import RecipeShowMore from '../../components/recipe-show-more/component';

import './styles.scss';

export class RecipeApp extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchRecipes());
  }

  getShowMore(dispatch) {
    const filterTerm = this.props.recipes.filterTerm;
    const noOfRecipes = this.props.recipes.items.length;
    const noOfFilteredRecipes = this.props.recipes.filteredResults.length;
    const noOfItemsInView = this.props.recipes.noOfItemsInView;

    if ((!filterTerm && (noOfRecipes > noOfItemsInView)) || (filterTerm && (noOfFilteredRecipes > noOfItemsInView))) {
      return <RecipeShowMore onShowMore={() => dispatch(showMoreRecipes())} />;
    }
  }

  render() {
    const { dispatch, recipes } = this.props;
    let noResults;

    if (recipes.filterTerm && recipes.itemsInView.length === 0) {
      noResults = <h3 className="bbc-recipe-list-view__no-results">Sorry, nothing matched your filter term</h3>;
    }

    return (
      <div className="bbc-recipe-list-view">
        <RecipeHeader onFilterRecipes={searchTerm => dispatch(filterRecipes(searchTerm))} onSortRecipes={() => dispatch(sortRecipes())} />
        <RecipeList recipes={recipes.itemsInView} error={recipes.error} />
        {noResults}
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
