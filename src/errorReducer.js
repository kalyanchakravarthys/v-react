import { getErrors } from './errorHelper';

export default function errorReducer(state = [], action) {
  switch (action.type) {
    case 'SET_V_REACT_ERROR': {
      return [...getErrors(state, action.error)];
    }
    default:
      return state;
  }
}
