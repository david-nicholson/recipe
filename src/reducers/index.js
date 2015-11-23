import { combineReducers } from 'redux';
import aReducer from './a-reducer/a-reducer';

const reducers = combineReducers({
  aReducer,
});

export default reducers;
