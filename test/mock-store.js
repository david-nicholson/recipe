/**
* Creates a mock of Redux store with middleware.
* http://redux.js.org/docs/recipes/WritingTests.html
*/
import { expect } from 'chai';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const middlewares = [ thunk ];

export default function mockStore(getState, expectedActions, done) {
  if (!Array.isArray(expectedActions)) {
    throw new Error('expectedActions should be an array of expected actions.');
  }
  if (typeof done !== 'undefined' && typeof done !== 'function') {
    throw new Error('done should either be undefined or function.');
  }

  function mockStoreWithoutMiddleware() {
    return {
      getState() {
        return typeof getState === 'function' ?
          getState() :
          getState;
      },

      dispatch(action) {
        const expectedAction = expectedActions.shift();
        try {
          expect(action).to.eql(expectedAction);
          if (done && expectedActions.length === 0) {
            done();
          }
        } catch (e) {
          done(e);
        }
      }
    }
  }

  const mockStoreWithMiddleware = applyMiddleware(
    ...middlewares
  )(mockStoreWithoutMiddleware)

  return mockStoreWithMiddleware()
}
