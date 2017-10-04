/**
 * Created by manhvu on 9/28/17.
 */
import { createAction, createReducer } from '../../utils/store';
import * as UserService from '../../service/UserService';
import * as FoodService from '../../service/FoodService';

const storeName = 'DashboardDuck';

// define action type
export const actionTypes = {
  initialize: storeName + '/initialize',
  openDialog: storeName + '/openDialog',
  closeDialog: storeName + '/closeDialog',
  addFood: storeName + '/addFood',
  abortAddFood: storeName + '/abortAddFood',
};

// Actions creators 
const openDialog = (mealTime) => createAction(actionTypes.openDialog, { mealTime });
const closeDialog = () => createAction(actionTypes.closeDialog);

// Thunks
const initialize = () => async (dispatch) => {
  const currentUser = await UserService.getCurrentUser();
  const foodIntakeTracking = await FoodService.getFoodIntakeTracking(currentUser.id);
  const foodSuggestions = await FoodService.getFoodSuggestions(currentUser.id);

  // Dispatch initialize action with all the data to
  // supply smaller containers
  dispatch(createAction(actionTypes.initialize, {
    currentUser,
    foodIntakeTracking,
    foodSuggestions,
  }));
};

const addFood = (foodData) => (dispatch, getState) => {
  // TODO: actually submit food data addition to UserService
  const state = getState()[storeName];
  if(foodData.foodDetails.calories + state.calories.current > state.calories.target) {
    dispatch(createAction(actionTypes.abortAddFood));
  }

  dispatch(createAction(actionTypes.addFood, {
    foodData
  }));
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
      currentUser: payload.currentUser,
      breakfast: payload.foodIntakeTracking.breakfast,
      lunch: payload.foodIntakeTracking.lunch,
      dinner: payload.foodIntakeTracking.dinner,
      calories: payload.foodIntakeTracking.calories,
      foodSuggestions: payload.foodSuggestions,
    };
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
}