/**
 * Created by manhvu on 9/28/17.
 */
import moment from 'moment';
import { 
  union, 
  reduce, 
  isEmpty, 
  isObject, 
  round,
} from 'lodash';
import { createAction, createReducer } from '../../utils/store';
import UserService from '../../service/UserService';
import FoodService from '../../service/FoodService';
import {convertMgToGam} from '../../utils/AppUtils';

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
  updateCurrentIngredients: storeName + '/UPDATE_CURRENT_INGREDIENTS',
  selectNutrient: storeName + '/selectNutrient',
  updateNutrientsToday: storeName + '/NUTRIENTS_TODAY_UPDATE',
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
const updateCurrentIngredients = () => createAction(actionTypes.updateCurrentIngredients);
const updateNutrientsToday = () => createAction(actionTypes.updateNutrientsToday);

// Thunks
const initialize = (queryTime) => async (dispatch, getState) => {
  // Default to now time if not specified
  if(!queryTime) {
    queryTime = moment(new Date()).format();
  }

  dispatch(pickQueryTime(queryTime));

  let tracking = {};
  let nutritionLog = {};
  let userInfo = await UserService.getUserSettings();
  if(!isObject(userInfo.data)) { 
    userInfo.data = {};
  }
  if (!isEmpty(userInfo.data)) {
    tracking = await UserService.getDailyReport(queryTime);
    nutritionLog = await UserService.getNutritionLog(queryTime);
  }
  dispatch(createAction(actionTypes.initialize, { 
    ...tracking,
    nutritionLog: nutritionLog.data || {},
    currentUser: userInfo.data || {},
  }));

  dispatch(updateCurrentIngredients());
  dispatch(updateNutrientsToday());
};

const removeFoods = () => async (dispatch, getState) => {
  const foodsToRemove = getState()[storeName].toBeRemoved;
  const queryTime = getState()[storeName].queryTime;
  const foodIntakePayload = constructIntakeRemovePayload(foodsToRemove);
  let response;
  try {
    response = await FoodService.removeFoods(foodIntakePayload);
  } catch (err) {
    dispatch(failRemoveFoods(err));
  }

  if (isObject(response.data)) {
    dispatch(succeedRemoveFoods(foodsToRemove));
    dispatch(initialize(queryTime));
  }
  dispatch(clearRemoveFood());
}

const submitFoods = (foodsToAdd, queryTime) => async (dispatch) => {
  const foodIntakePayload = constructIntakePayload(foodsToAdd, queryTime);
  try {
    await FoodService.addFoodIntake(foodIntakePayload);
  } catch (err) {
    dispatch(failSubmitFoods(err));
  }

  dispatch(succeedSubmitFoods());
  dispatch(closeDialog());
  dispatch(clearAddFood());
  dispatch(initialize(queryTime));
}

const selectNutrient = item => (dispatch, getState) => {
  const queryDate = getState()[storeName].queryTime;
  FoodService.nutrients(item, queryDate).then(res => {
    dispatch(createAction(actionTypes.selectNutrient, {item, foodSuggestions: res.data}));
  });
};

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
  updateCurrentIngredients,
  selectNutrient,
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
  ingredients: {
    targets: {
      protein: null,
      sodium: null,
      calcium: null,
      cellulose: null,
      potassium: null,
    },
    current: {
      protein: 0,
      sodium: 0,
      calcium: 0,
      cellulose: 0,
      potassium: 0,
    }
  },
  nutritionLog: [],
  nutrients: [
    {
      id: 'all',
      text: '전체보기',
      selected: true,
    },{
      id: 'protein',
      text: '단백질',
      selected: false,
    },
    {
      id: 'sodium',
      text: '나트륨',
      selected: false,
    },
    {
      id: 'calcium',
      text: '칼슘',
      selected: false,
    },
    {
      id: 'cellulose',
      text: '탄수화물',
      selected: false,
    },
    {
      id: 'potassium',
      text: '칼륨',
      selected: false,
    }
  ],
  nutrientsToday: {
    protein: 0,
    sodium: 0,
    calcium: 0,
    cellulose: 0,
  },
  sourceCalories: ''
};

// Dashboard reducer
const reducer = createReducer(initialState, {
  [actionTypes.initialize]: (state, payload) => {
    let { breakfast, lunch, dinner } = payload;
    const caloriesCurrent = calculateCalories(breakfast, lunch, dinner);
    const nutritionLog = transformLog(payload.nutritionLog);
    nutritionLog.forEach(function (val) {
      val.protein = convertMgToGam(val.protein);
      val.sodium = convertMgToGam(val.sodium);
      val.potassium = convertMgToGam(val.potassium);
    });
    breakfast = addSelectedState(breakfast) || [];
    lunch = addSelectedState(lunch) || [];
    dinner = addSelectedState(dinner) || [];
    
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
      nutritionLog,
      ingredients: {
        ...initialState.ingredients,
        targets: {
          protein: payload.proteinTarget,
          sodium: payload.sodiumTarget,
          calcium: payload.calciumTarget,
          cellulose: payload.celluloseTarget,
          potassium: payload.potassiumTarget,
        }
      },
      sourceCalories: payload.sourceCalories
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
  [actionTypes.updateCurrentIngredients]: (state, payload) => {
    let { breakfast, lunch, dinner } = state;
    const targets = state.ingredients.targets;
    const allIntakes = union(breakfast, lunch, dinner);
    const protein = allIntakes.map(mapNutrient('protein')).reduce(sumPair, 0);
    const sodium = allIntakes.map(mapNutrient('sodium')).reduce(sumPair, 0);
    const calcium = allIntakes.map(mapNutrient('calcium')).reduce(sumPair, 0);
    const cellulose = allIntakes.map(mapNutrient('cellulose')).reduce(sumPair, 0);
    const potassium = allIntakes.map(mapNutrient('potassium')).reduce(sumPair, 0);

    return {
      ...state,
      ingredients: {
        ...state.ingredients,
        current: {
          protein: getNutrientPercentage(protein, targets.protein),
          sodium: getNutrientPercentage(sodium, targets.sodium),
          calcium: getNutrientPercentage(calcium, targets.calcium),
          cellulose: getNutrientPercentage(cellulose, targets.cellulose),
          potassium: getNutrientPercentage(potassium, targets.potassium),
        }
      }
    }
  },
  [actionTypes.selectNutrient]: (state, { item, foodSuggestions }) => {
    const newState = { ...state, foodSuggestions };

    newState.nutrients.forEach((i, idx) => {
      i.selected = false;
      if (i.id === item.id) {
        item.idx = idx;
      }
    });

    if (item.idx >= 0) {
      item.selected = true;

      newState.nutrients = [
        ...newState.nutrients.slice(0, item.idx),
        item,
        ...newState.nutrients.slice(item.idx + 1, newState.nutrients.length)
      ];

      delete item.idx;
    }
    return newState;
  },
  [actionTypes.updateNutrientsToday]: (state, payload) => {
    let { breakfast, lunch, dinner } = state;
    const allIntakes = union(breakfast, lunch, dinner);
    const protein = allIntakes.map(mapNutrient('protein')).reduce(sumPair, 0);
    const sodium = allIntakes.map(mapNutrient('sodium')).reduce(sumPair, 0);
    const calcium = allIntakes.map(mapNutrient('calcium')).reduce(sumPair, 0);
    const cellulose = allIntakes.map(mapNutrient('cellulose')).reduce(sumPair, 0);
    const potassium = allIntakes.map(mapNutrient('potassium')).reduce(sumPair, 0);

    return {
      ...state,
      nutrientsToday: {
        protein: protein,
        sodium: sodium,
        calcium: calcium,
        cellulose: cellulose,
        potassium: potassium,
      }
    };
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
const getNutritionLog = (state) => state[storeName].nutritionLog;
const getNutrients = (state) => state[storeName].nutrients;
const getNutrientsToday = (state) => state[storeName].nutrientsToday;
const getSourceCalories = (state) => state[storeName].sourceCalories;

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
  getNutritionLog,
  getNutrients,
  getNutrientsToday,
  getSourceCalories,
}

function constructIntakePayload(foodsToAdd, queryTime) {
  const meal = foodsToAdd.mealTime.toUpperCase();
  return foodsToAdd.foods.map(food => ({
      meal,
      foodId: food.value.id,
      quantity: 1,
      createdDate: queryTime,
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

function transformLog (nutritionLog) {
  const dayKeys = Object.keys(nutritionLog);
  let dates = dayKeys.map(key => {
    return { raw: key, date: new Date(parseInt(key, 10)) }
  });
  
  dates = dates.sort((a, b) => a.date - b.date);
  if (dayKeys.length === 0) {
    return [];
  }

  return dates.map(day => {
    const dayIntakes = nutritionLog[day.raw];
    const dayInMonth = moment(day.date, 'x').format('D');
    const protein = reduce(dayIntakes.map(intake => intake.foodInfo.protein || 0), sumPair, 0);
    const sodium = reduce(dayIntakes.map(intake => intake.foodInfo.sodium || 0), sumPair, 0);
    const potassium = reduce(dayIntakes.map(intake => intake.foodInfo.potassium || 0), sumPair, 0);
    return { day: dayInMonth, protein, sodium, potassium };
  })
}

function mapNutrient (nutrientName) {
  return function (intake) {
    return intake.foodInfo[nutrientName];
  }
}  

function sumPair (a, b) {
  return parseInt(a, 10) + parseInt(b, 10);
}

function getNutrientPercentage (current, target) {
  return round(current / target * 100, 2);
}
