import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { exampleAction } from '../actions';
import AComponent from '../components/a-component';

class TheApp extends Component {
  render() {
    const { dispatch, aReducer } = this.props;

    return (
      <AComponent aReducer={aReducer} />
    );
    // example action: <AComponent onFilterSomething={something => dispatch(exampleAction(something))} />
  }
}

TheApp.propTypes = {};

function select(state) {
  console.log(state)
  return {
    aReducer: state.aReducer
  }
}

export default connect(select)(TheApp);
