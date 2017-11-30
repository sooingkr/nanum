/**
 * Created by manhvu on 9/28/17.
 */
import moment from 'moment';
import { 
  union, 
  reduce, 
  isEmpty, 
  isObject, 
} from 'lodash';
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
  succeedRemoveFoods: storeName + '/SUCCEED_REMOVE_FOODS',
  failRemoveFoods: storeName + '/FAIL_REMOVE_FOODS',
  succeedSubmitFoods: storeName + '/SUCCEED_SUBMIT_FOODS',
  failSubmitFoods: storeName + '/FAIL_SUBMIT_FOODS',
  updateIngredientsData: storeName + '/UPDATE_INGREDIENTS_DATA',
};

// Actions creators 
const openDialog = (mealTime) => createAction(actionTypes.openDialog, { mealTime });
const closeDialog = () => createAction(actionTypes.closeDialog);
const pickQueryTime = (queryTime) => createAction(actionTypes.pickQueryTime, { queryTime });  
const enterEdit = () => createAction(actionTypes.enterEdit);
const quitEdit = () => createAction(actionTypes.quitEdit);
const clearRemoveFood = () => createAction(actionTypes.clearRemoveFood);
const failRemoveFoods = (error) => createAction(actionTypes.failRemoveFoods, { error });
const failSubmitFoods = (error) => createAction(actionTypes.failSubmitFoods, { error });
const succeedRemoveFoods = (foodsToRemove) => createAction(actionTypes.succeedRemoveFoods, { foodsToRemove });
const succeedSubmitFoods = () => createAction(actionTypes.succeedSubmitFoods);
const markRemoveFood = (foodId, mealTime) => createAction(actionTypes.markRemoveFood, { id: foodId, mealTime });
const addFood = (food, mealTime) => dispatch => {
  dispatch(createAction(actionTypes.addFood, {food, mealTime}))
};
const clearAddFood = () => createAction(actionTypes.clearAddFood);
const updateIngredientsData = (ingredients) => createAction(actionTypes.updateIngredientsData, { ingredients });

// Thunks
const initialize = (queryTime) => async (dispatch, getState) => {
  // Default to now time if not specified
  if(!queryTime) {
    queryTime = moment(new Date()).format();
  }

  dispatch(pickQueryTime(queryTime));

  let tracking = {};
  let userInfo = await UserService.getUserSettings();
  if(!isObject(userInfo)) { 
    userInfo = {};
  }
  if (!isEmpty(userInfo)) {
    tracking = await UserService.getDailyReport(queryTime);
  }

  dispatch(createAction(actionTypes.initialize, { 
    ...tracking,
    currentUser: userInfo,
  }));

  dispatch(updateIngredientsData());
};

const removeFoods = () => async (dispatch, getState) => {
  const foodsToRemove = getState()[storeName].toBeRemoved;
  const foodIntakePayload = constructIntakeRemovePayload(foodsToRemove);
  try {
    await FoodService.removeFoods(foodIntakePayload);
  } catch (err) {
    dispatch(failRemoveFoods(err));
  }

  dispatch(succeedRemoveFoods(foodsToRemove));
  dispatch(clearRemoveFood());
}

const submitFoods = (foodsToAdd) => async (dispatch) => {
  const foodIntakePayload = constructIntakePayload(foodsToAdd);
  try {
    await FoodService.addFoodIntake(foodIntakePayload);
  } catch (err) {
    dispatch(failSubmitFoods(err));
  }

  dispatch(succeedSubmitFoods());
  dispatch(closeDialog());
  dispatch(clearAddFood());
  dispatch(initialize());
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
  markRemoveFood,
  clearRemoveFood,
  failRemoveFoods,
  submitFoods,
  removeFoods,
  updateIngredientsData,
};

// Initial Dashboard state tree
export const initialState = {
  queryTime: "",
  error: null,
  alert: {
    message: '회원정보가 없습니다. 정보를 넣어주세요.',
    type: 'danger',
  },
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
  toBeRemoved: [],
  toBeAdded: {
    mealTime: '',
    foods: [],
  },
  ingredients: [],
};

// Dashboard reducer
const reducer = createReducer(initialState, {
  [actionTypes.initialize]: (state, payload) => {
    let { breakfast, lunch, dinner } = payload;
    const caloriesCurrent = reduce(union(breakfast, lunch, dinner), (sum, intake) => {
      return sum + intake.foodInfo.calories;
    }, 0);
    breakfast = addSelectedState(breakfast);
    lunch = addSelectedState(lunch);
    dinner = addSelectedState(dinner);
    
    return {
      ...state,
      alert: payload.alert || state.alert,
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
    const newIntakes = state[payload.mealTime].map(intake => {
      if (intake.id === payload.id) {
        return { ...intake, selected: true };
      } else {
        return intake;
      }
    });
    return {
      ...state,
      [payload.mealTime]: newIntakes,
      toBeRemoved: [
        ...state.toBeRemoved,
        payload,
      ]
    }
  },
  [actionTypes.clearRemoveFood]: (state) => {
    const clearRemoveFilter = intake => ({ ...intake, selected: false });
    return {
      ...state,
      breakfast: state.breakfast.map(clearRemoveFilter),
      lunch: state.lunch.map(clearRemoveFilter),
      dinner: state.dinner.map(clearRemoveFilter),
      toBeRemoved: [],
    }
  },
  [actionTypes.succeedRemoveFoods]: (state, payload) => {
    const ids = payload.foodsToRemove.map(food => food.id);
    const filterFunc = food => ids.indexOf(food.id) !== -1;
    return {
      ...state,
      error: null,
      breakfast: state.breakfast.filter(filterFunc),
      lunch: state.lunch.filter(filterFunc),
      dinner: state.dinner.filter(filterFunc),
    }
  },
  [actionTypes.failRemoveFoods]: (state, payload) => {
    return {
      ...state,
      error: payload.error
    }
  },
  [actionTypes.failSubmitFoods]: (state, payload) => {
    return {
      ...state,
      error: payload.error
    }
  },
  [actionTypes.updateIngredientsData]: (state, payload) => {
    const data = [
      { ingredient: '탄수화물', current: mockDatapoint(), fullMark: 100 },
      { ingredient: '단백질', current: mockDatapoint(), fullMark: 100 },
      { ingredient: '무기질', current: mockDatapoint(), fullMark: 100 },
      { ingredient: '비타민', current: mockDatapoint(), fullMark: 100 },
      { ingredient: '지방', current: mockDatapoint(), fullMark: 100 },
    ]
    return {
      ...state,
      ingredients: data
    }
  },
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
const getToBeAdded = (state) => state[storeName].toBeAdded;
const getIngredients = (state) => state[storeName].ingredients;

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
  getToBeAdded,
  getIngredients,
}

function constructIntakePayload (foodsToAdd) {
  const meal = foodsToAdd.mealTime.toUpperCase();
  return foodsToAdd.foods.map(food => ({
      meal,
      foodId: food.value.id,
      quantity: 1,
    }
  ))
}

function constructIntakeRemovePayload (foodsToRemove) {
  return foodsToRemove.map(food => {
    return {
      ...food,
      meal: food.mealTime.toUpperCase()
    }
  })
}

function addSelectedState (intakes) {
  if (!intakes) return null;
  return intakes.map(intake => ({ ...intake, selected: false }) );
}

function calculateCalories (breakfast, lunch, dinner) {
  return reduce(union(breakfast, lunch, dinner), (sum, intake) => {
    return sum + intake.foodInfo.calories;
  }, 0);
}

function mockDatapoint () {
  return Math.floor(Math.random() * 101) + 0;
}