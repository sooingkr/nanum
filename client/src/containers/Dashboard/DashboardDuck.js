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
const markRemoveFood = (foodId, mealTime) => createAction(actionTypes.markRemoveFood, { id: foodId, meal: mealTime });
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
  if(!isObject(userInfo.data)) { 
    userInfo.data = {};
  }
  if (!isEmpty(userInfo.data)) {
    tracking = await UserService.getDailyReport(queryTime);
  }

  dispatch(createAction(actionTypes.initialize, { 
    ...tracking,
    currentUser: userInfo.data,
  }));

  dispatch(updateIngredientsData());
};

const removeFoods = () => async (dispatch, getState) => {
  const foodsToRemove = getState()[storeName].toBeRemoved;
  const foodIntakePayload = constructIntakeRemovePayload(foodsToRemove);
  let response;
  try {
    response = await FoodService.removeFoods(foodIntakePayload);
  } catch (err) {
    dispatch(failRemoveFoods(err));
  }

  if (isObject(response.data)) {
    dispatch(succeedRemoveFoods(foodsToRemove));
  }
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
    type: 'INFO',
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
    const caloriesCurrent = calculateCalories(breakfast, lunch, dinner);
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
    const newIntakes = state[payload.meal].map(intake => {
      if (intake.id === payload.id) {
        return { ...intake, selected: true };
      } else {
        return intake;
      }
    });
    return {
      ...state,
      [payload.meal]: newIntakes,
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
    const idMap = food => food.id;
    const mealFilter = meal => food => food.meal === meal;
    const idFilter = ids => food => ids.indexOf(food.id) === -1;
    const breakfastIds = payload.foodsToRemove.filter(mealFilter('breakfast')).map(idMap);
    const lunchIds = payload.foodsToRemove.filter(mealFilter('lunch')).map(idMap);
    const dinnerIds = payload.foodsToRemove.filter(mealFilter('dinner')).map(idMap);
    const newBreakfast = state.breakfast.filter(idFilter(breakfastIds));
    const newLunch = state.lunch.filter(idFilter(lunchIds));
    const newDinner = state.dinner.filter(idFilter(dinnerIds));
    const caloriesCurrent = calculateCalories(newBreakfast, newLunch, newDinner);

    return {
      ...state,
      error: null,
      breakfast: newBreakfast,
      lunch: newLunch,
      dinner: newDinner,
      caloriesCurrent,
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
    return {
      ...state,
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
      meal: food.meal.toUpperCase()
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