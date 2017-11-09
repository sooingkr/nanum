/**
 * Created by manhvu on 9/28/17.
 */
import { createAction, createReducer } from '../../utils/store';
import UserService from '../../service/UserService';
import FoodService from '../../service/FoodService';
import moment from 'moment';

const storeName = 'Dashboard';

// define action type
export const actionTypes = {
  initialize: storeName + '/INITIALIZE',
  openDialog: storeName + '/OPEN_DIALOG',
  closeDialog: storeName + '/CLOSE_DIALOG',
  addFood: storeName + '/ADD_FOOD',
  removeFoods: storeName + '/REMOVE_FOODS',
  abortAddFood: storeName + '/ABORT_ADD_FOOD',
  pickQueryTime: storeName + '/PICK_QUERY_TIME',
  enterEdit: storeName + '/ENTER_EDIT',
  quitEdit: storeName + '/QUIT_EDIT',
  markRemoveFood: storeName + '/MARK_REMOVE_FOOD',
  clearRemoveFood: storeName + '/CLEAR_REMOVE_FOOD',
  succeedRemoveFood: storeName + '/SUCCEED_REMOVE_FOOD',
  failRemoveFood: storeName + '/FAIL_REMOVE_FOOD',
};

// Actions creators 
const openDialog = (mealTime) => createAction(actionTypes.openDialog, { mealTime });
const closeDialog = () => createAction(actionTypes.closeDialog);
const pickQueryTime = (queryTime) => createAction(actionTypes.pickQueryTime, { queryTime });  
const enterEdit = () => createAction(actionTypes.enterEdit);
const quitEdit = () => createAction(actionTypes.quitEdit);
const clearRemoveFood = () => createAction(actionTypes.clearRemoveFood);
const failRemoveFood = () => createAction(actionTypes.failRemoveFood);
const succeedRemoveFood = (foodsToRemove) => createAction(actionTypes.succeedRemoveFood, { foods: foodsToRemove });
const markRemoveFood = (foodId, mealTime) => createAction(actionTypes.markRemoveFood, { 
  [foodId + ':' + mealTime]: {
    foodId,
    mealTime,
  },
});

// Thunks
const initialize = (queryTime) => async (dispatch, getState) => {
  // Default to now time if not specified
  if(!queryTime) {
    queryTime = moment(new Date()).format();
  }

  dispatch(pickQueryTime(queryTime));

  const tracking = await UserService.getTrackingData(queryTime);
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

const removeFoods = () => async (dispatch, getState) => {
  const state = getState()[storeName];
  const foodsToRemove = Object.values(state.toBeRemoved);
  const isSuccessful = await FoodService.removeFoods(foodsToRemove);
  if (isSuccessful) {
    dispatch(succeedRemoveFood(foodsToRemove));
    dispatch(clearRemoveFood());
  } else {
    dispatch(failRemoveFood());
  }
}

// conveniently export actions
const actions = {
  initialize,
  openDialog,
  closeDialog,
  addFood,
  enterEdit,
  quitEdit,
  removeFoods,
  markRemoveFood,
  clearRemoveFood,
  failRemoveFood,
};

// Initial Dashboard state tree
export const initialState = {
  queryTime: "",
  alert: {},
  currentUser: {},
  breakfast: [],
  lunch: [],
  dinner: [],
  calories: {},
  showDialog: false,
  whichDialog: "",
  foodSuggestions: {},
  isLoading: true,
  isEditMode: false,
  toBeRemoved: {},
};

// Dashboard reducer
const reducer = createReducer(initialState, {
  [actionTypes.initialize]: (state, payload) => {
    // TODO: normalize data
    return {
      ...state,
      currentUser: payload.user,
      alert: payload.alert,
      breakfast: payload.foodIntakeTracking.when.breakfast,
      lunch: payload.foodIntakeTracking.when.lunch,
      dinner: payload.foodIntakeTracking.when.dinner,
      calories: payload.foodIntakeTracking.calories,
      foodSuggestions: payload.foodSuggestions,
      isLoading: false,
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
  },
  [actionTypes.enterEdit]: (state) => {
    return {
      ...state,
      isEditMode: true
    }
  },
  [actionTypes.quitEdit]: (state) => {
    return {
      ...state,
      isEditMode: false,
    }
  },
  [actionTypes.markRemoveFood]: (state, payload) => {
    return {
      ...state,
      toBeRemoved: {
        ...state.toBeRemoved,
        ...payload,
      }
    }
  },
  [actionTypes.clearRemoveFood]: (state) => {
    return {
      ...state,
      toBeRemoved: {},
    }
  },
  [actionTypes.succeedRemoveFood]: (state, payload) => {
    // TODO
    return {
      ...state
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
const getAlert = (state) => state[storeName].alert;
const getTime = (state) => state[storeName].queryTime;
const getLoadingStatus = (state) => state[storeName].isLoading;
const getEditMode = (state) => state[storeName].isEditMode;

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
  getAlert,
  getTime,
  getLoadingStatus,
  getEditMode,
}