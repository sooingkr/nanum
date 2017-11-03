/**
 * Created by manhvu on 9/28/17.
 */
import { createAction, createReducer } from '../../utils/store';
import UserService from '../../service/UserService';
import { getAuth } from '../../utils/auth';
import moment from 'moment';

const storeName = 'Dashboard';

// define action type
export const actionTypes = {
  initialize: storeName + '/INITIALIZE',
  openDialog: storeName + '/OPEN_DIALOG',
  closeDialog: storeName + '/CLOSE_DIALOG',
  addFood: storeName + '/ADD_FOOD',
  abortAddFood: storeName + '/ABORT_ADD_FOOD',
  pickQueryTime: storeName + '/PICK_QUERY_TIME',
};

// Actions creators 
const openDialog = (mealTime) => createAction(actionTypes.openDialog, { mealTime });
const closeDialog = () => createAction(actionTypes.closeDialog);
const pickQueryTime = (queryTime) => createAction(actionTypes.pickQueryTime, { queryTime });  

// Thunks
const initialize = (queryTime) => async (dispatch, getState) => {
  if(!queryTime) {
    queryTime = moment(new Date()).format();
  }
  // Get auth data from localstorage
  const auth = getAuth();
  dispatch(pickQueryTime(queryTime));

  const tracking = await UserService.getTrackingData(auth.token, queryTime);
  dispatch(createAction(actionTypes.initialize, { 
    ...tracking,
  }));
};

const addFood = (foodData) => (dispatch, getState) => {
  // TODO: actually submit food data addition to UserService
  const state = getState()[storeName];

  // Only add food if it is below maximum calories
  if(foodData.foodDetails.calories + state.calories.current > state.calories.target) {
    dispatch(createAction(actionTypes.abortAddFood));
  }

  dispatch(createAction(actionTypes.addFood, {
    foodData
  }));

  // Refetch the diagnostic
  dispatch(initialize(state.queryTime));
}

// conveniently export actions
const actions = {
  initialize,
  openDialog,
  closeDialog,
  addFood,
};

// Initial Dashboard state tree
export const initialState = {
  queryTime: "",
  diagnostic: {},
  currentUser: {},
  breakfast: [],
  lunch: [],
  dinner: [],
  calories: {},
  showDialog: false,
  whichDialog: "",
  foodSuggestions: {},
};

// Dashboard reducer
const reducer = createReducer(initialState, {
  [actionTypes.initialize]: (state, payload) => {
    return {
      ...state,
      currentUser: payload.user,
      diagnostic: payload.diagnostic,
      breakfast: payload.foodIntakeTracking.when.breakfast,
      lunch: payload.foodIntakeTracking.when.lunch,
      dinner: payload.foodIntakeTracking.when.dinner,
      calories: payload.foodIntakeTracking.calories,
      foodSuggestions: payload.foodSuggestions,
    };
  },
  [actionTypes.pickQueryTime]: (state, payload) => {
    return {
      ...state,
      queryTime: payload.queryTime,
    }
  },
  [actionTypes.openDialog]: (state, payload) => {
    return {
      ...state,
      showDialog: true,
      whichDialog: payload.mealTime,
    }
  },
  [actionTypes.closeDialog]: (state, payload) => {
    return {
      ...state,
      showDialog: false,
    }
  },
  [actionTypes.addFood]: (state, payload) => {
    return {
      ...state,
      calories: {
        ...state.calories,
        current: state.calories.current + payload.foodData.foodDetails.calories,
      },
      [payload.foodData.mealTime]: [
        ...getFoodsWhen(state, payload.foodData.mealTime),
        { ...payload.foodData.foodDetails },
      ]
    }
  }
});

// Selectors
const getCurrentUser = (state) => state[storeName].currentUser;
const getFoodIntakeTracking = (state) => ({
  calories: state[storeName].calories,
  when: {
    breakfast: state[storeName].breakfast,
    lunch: state[storeName].lunch,
    dinner: state[storeName].dinner,
  }
});
const getShowDialog = (state) => state[storeName].showDialog;
const getWhichDialog = (state) => state[storeName].whichDialog;
const getFoodsWhen = (state, when) => state[when];
const getFoodSuggestions = (state) => state[storeName].foodSuggestions;
const getDiagnostic = (state) => state[storeName].diagnostic;
const getTime = (state) => state[storeName].queryTime;

export const DashboardDuck = {
  storeName,
  reducer,
  actions, 
};

export const selectors = {
  getCurrentUser,
  getFoodIntakeTracking,
  getShowDialog,
  getWhichDialog,
  getFoodSuggestions,
  getDiagnostic,
  getTime,
}