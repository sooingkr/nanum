/**
 * Created by manhvu on 9/21/17.
 */
import { createAction, createReducer, NOPE_FN } from '../config/Utils';
import _ from 'lodash';

// import service

export const storeName = 'HomeDuck';

// define action type
export const actionTypes = {
  initialize: storeName + '/initialize',
};

// define action
export const initialize = params => dispatch => {
  return dispatch(createAction(actionTypes.initialize, params));
};

// conveniently export actions
export const actions = {
  initialize,
};

export const initialState = {
  title: 'This is home page'
};

const reducer = createReducer(initialState, {
  [actionTypes.initialize]: (state, payload) => {
    const newState = { ...state };

    // TODO update state field base on payload

    return newState;
  }
});

export const homeDuck = {
  storeName,
  reducer
};
