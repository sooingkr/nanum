/**
 * Created by manhvu on 9/28/17.
 */
import { createAction, createReducer } from '../../utils/store';
import { userService } from '../../service/UserService';

// import service

const storeName = 'DashboardDuck';

// define action type
export const actionTypes = {
  initialize: storeName + '/initialize',
};

// define action
export const initialize = () => dispatch => {
  return userService.getCurrentUser()
    .then(res => dispatch(createAction(actionTypes.initialize, res.data)));
};

// conveniently export actions
const actions = {
  initialize,
};

export const initialState = {
  currentUser: {}
};

const reducer = createReducer(initialState, {
  [actionTypes.initialize]: (state, currentUser) => {
    return {
      ...state,
      currentUser
    };
  }
});

export const dashboardDuck = {
  storeName,
  reducer,
  actions
};