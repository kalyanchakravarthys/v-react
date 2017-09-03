import { getErrors } from './errorHelper';
import * as actionTypes from '../constants/actionTypes';

export default function errorReducer(state = [], action) {
  switch (action.type) {
    case 'SET_ERROR': {
      return [...getErrors(state, action.error)];
    }
    default:
      return state;
  }
}
