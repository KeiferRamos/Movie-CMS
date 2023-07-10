import { SET_USER } from './action';

export function reducer(state, action) {
  if (action.type === SET_USER) {
    return Object.assign(state, action.payload);
  }
  return state;
}
