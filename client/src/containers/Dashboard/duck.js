/**
 * Created by manhvu on 9/28/17.
 */
import { createAction, createReducer } from '../../utils/store';
import * as userService from '../../service/UserService';

const storeName = 'DashboardDuck';

// define action type
export const actionTypes = {
  initialize: storeName + '/initialize',
  toggleDialog: storeName + '/toggleDialog',
};

// Actions creators 
const toggleDialog = () => createAction(actionTypes.toggleDialog);

// Thunks
const initialize = () => async (dispatch) => {
  const currentUser = await userService.getCurrentUser();
  const foodIntake = await userService.getFoodIntakeTracking(currentUser.data.user.id);
  // Dispatch initialize action with all the data to
  // supply smaller containers
  dispatch(createAction(actionTypes.initialize, {
    currentUser: currentUser.data.user,
    foodIntakeTracking: foodIntake.data.foodIntakeTracking,
  }));
};

// conveniently export actions
const actions = {
  initialize,
  toggleDialog,
};

// Initial Dashboard state tree
export const initialState = {
  currentUser: {},
  showDialog: false,
};

// Dashboard reducer
const reducer = createReducer(initialState, {
  [actionTypes.initialize]: (state, payload) => {
    return {
      ...state,
      currentUser: payload.currentUser,
      foodIntakeTracking: payload.foodIntakeTracking,
    };
  },
  [actionTypes.toggleDialog]: (state, payload) => {
    return {
      ...state,
      showDialog: !state.showDialog,
    }
  }
});

// Selectors
const getCurrentUser = (state) => state[storeName].currentUser;
const getFoodIntakeTracking = (state) => state[storeName].foodIntakeTracking;
const getShowDialog = (state) => state[storeName].showDialog;

export const dashboardDuck = {
  storeName,
  reducer,
  actions, 
};

export const selectors = {
  getCurrentUser,
  getFoodIntakeTracking,
  getShowDialog,
}