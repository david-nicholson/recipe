import { EXAMPLE_ACTION } from '../../actions';

const initialState = ['boom'];

export default function someThings(state = initialState, action) {
  switch (action.type) {
    case EXAMPLE_ACTION:
      return [ action.something ];
    default:
      return state;
  }
};
