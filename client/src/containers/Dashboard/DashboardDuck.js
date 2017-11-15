/**
 * Created by manhvu on 9/28/17.
 */
import moment from 'moment';
import { union, reduce } from 'lodash';
import { createAction, createReducer } from '../../utils/store';
import UserService from '../../service/UserService';
import FoodService from '../../service/FoodService';

const storeName = 'Dashboard';

// define action type
export const actionTypes = {
  initialize: storeName + '/INITIALIZE',
  openDialog: storeName + '/OPEN_DIALOG',
  closeDialog: storeName + '/CLOSE_DIALOG',
  addFood: storeName + '/ADD_FOOD',
  clearAddFood: storeName + '/CLEAR_ADD_FOOD',
  removeFoods: storeName + '/REMOVE_FOODS',
  pickQueryTime: storeName + '/PICK_QUERY_TIME',
  enterEdit: storeName + '/ENTER_EDIT',
  quitEdit: storeName + '/QUIT_EDIT',
  markRemoveFood: storeName + '/MARK_REMOVE_FOOD',
  clearRemoveFood: storeName + '/CLEAR_REMOVE_FOOD',
  succeedRemoveFood: storeName + '/SUCCEED_REMOVE_FOOD',
  failRemoveFood: storeName + '/FAIL_REMOVE_FOOD',
  submitFoods: storeName + '/SUBMIT_FOODS',
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
const addFood = (food, mealTime) => dispatch => {
  dispatch(createAction(actionTypes.addFood, {food, mealTime}))
};
const clearAddFood = () => createAction(actionTypes.clearAddFood);

// Thunks
const initialize = (queryTime) => async (dispatch, getState) => {
  // Default to now time if not specified
  if(!queryTime) {
    queryTime = moment(new Date()).format();
  }

  dispatch(pickQueryTime(queryTime));

  const tracking = await UserService.getDailyReport(queryTime);
  const userInfo = await UserService.getUserInfo();
  const userDiseases = await UserService.getUserDiseases();

  dispatch(createAction(actionTypes.initialize, { 
    ...tracking,
    currentUser: { 
      ...userInfo,
      diseases: [
        ...userDiseases
      ]
    },
  }));
};

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

const submitFoods = () => async (dispatch) => {
  dispatch(createAction(actionTypes.submitFoods));
}

// conveniently export actions
const actions = {
  initialize,
  openDialog,
  closeDialog,
  addFood,
  clearAddFood,
  enterEdit,
  quitEdit,
  removeFoods,
  markRemoveFood,
  clearRemoveFood,
  failRemoveFood,
  submitFoods,
};

// Initial Dashboard state tree
export const initialState = {
  queryTime: "",
  alert: {},
  currentUser: {},
  breakfast: [],
  lunch: [],
  dinner: [],
  caloriesTarget: null,
  caloriesCurrent: null,
  showDialog: false,
  whichDialog: "",
  foodSuggestions: [],
  reason: "",
  isLoading: true,
  isEditMode: false,
  toBeRemoved: {},
  toBeAdded: {
    mealTime: '',
    foods: [],
  },
};

// Dashboard reducer
const reducer = createReducer(initialState, {
  [actionTypes.initialize]: (state, payload) => {
    const { breakfast, lunch, dinner } = payload;
    const caloriesCurrent = reduce(union(breakfast, lunch, dinner), (sum, intake) => {
      return sum + intake.foodInfo.calories;
    }, 0);

    return {
      ...state,
      alert: payload.alert,
      currentUser: payload.currentUser,
      breakfast,
      lunch,
      dinner,
      caloriesTarget: payload.caloriesTarget,
      caloriesCurrent,
      foodSuggestions: payload.foodSuggestions,
      reason: payload.reason,
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
      whichDialog: "",
    }
  },
  [actionTypes.addFood]: (state, payload) => {
    return {
      ...state,
      toBeAdded: {
        mealTime: payload.mealTime,
        foods: [
          ...state.toBeAdded.foods,
          payload.food,
        ]        
      }
    }
  },
  [actionTypes.clearAddFood]: (state) => {
    return {
      ...state,
      toBeAdded: {
        mealTime: "",
        foods: [],
      },
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
  caloriesTarget: state[storeName].caloriesTarget,
  caloriesCurrent: state[storeName].caloriesCurrent,
  when: {
    breakfast: state[storeName].breakfast,
    lunch: state[storeName].lunch,
    dinner: state[storeName].dinner,
  }
});
const getShowDialog = (state) => state[storeName].showDialog;
const getWhichDialog = (state) => state[storeName].whichDialog;
const getFoodSuggestions = (state) => state[storeName].foodSuggestions;
const getReason = (state) => state[storeName].reason;
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
  getReason,
}