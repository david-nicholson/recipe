import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { exampleAction } from '../actions';
import AComponent from '../components/a-component';

class TheApp extends Component {
  render() {
    const { dispatch, aReducer } = this.props;

    return (
      <AComponent aReducer={aReducer} onExample={something => dispatch(exampleAction(something))} />
    );
  }
}

TheApp.propTypes = {
  dispatch: PropTypes.func.isRequired,
  aReducer: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  console.log(state);
  return {
    aReducer: state.aReducer,
  };
}

export default connect(mapStateToProps)(TheApp);
