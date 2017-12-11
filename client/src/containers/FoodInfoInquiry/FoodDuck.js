/**
 * Created by yenhua on 11/2/17.
 */
import { isObject, isEmpty } from 'lodash';
import { createAction, createReducer } from '../../utils/store';
import FoodService from '../../service/FoodService';
import UserService from '../../service/UserService';
import {averageNutrients} from '../../utils/AppUtils';

// import service

export const storeName = 'FoodInquiryDuck';

export const initialState = {
  foodDetail: {
    carbohydratesDifferent: 0,
    proteinsDifferent: 0,
    fatDifferent: 0,
  },
  hasUserInfo: false,
  status: null,
};

// define action type
export const actionTypes = {
  getFoodDetail: storeName + '/GET_FOOD_DETAIL',
  failGetFoodDetail: storeName + '/FAIL_GET_FOOD_DETAIL',
  getUserInfo: storeName + '/GET_USER_INFO',
};

// define thunks
export const getFoodDetailData = (foodId) => async dispatch => {
  let foodDetail, userInfo;
  let hasUserInfo = false;

  try {
    foodDetail = await FoodService.foodDetail(foodId);
    userInfo = await UserService.getUserSettings();
    dispatch(createAction(actionTypes.getFoodDetail, {...initialState.foodDetail, ...foodDetail.data}));
    if (isObject(userInfo.data) && !isEmpty(userInfo.data)) {
      hasUserInfo = true;
    }
    
    dispatch(createAction(actionTypes.getUserInfo, { 
      hasUserInfo, 
      status: userInfo.status || userInfo.response.status
    }));
  } catch (err) {
    dispatch(createAction(actionTypes.failGetFoodDetail));
  }
  
};

// conveniently export actions
export const actions = {
  getFoodDetailData
};


const reducer = createReducer(initialState, {
  [actionTypes.getFoodDetail]: (state, foodDetail) => {
    const averageNutrientFood = averageNutrients(foodDetail.categoryCode);
    if (averageNutrientFood) {
      foodDetail.carbohydratesDifferent = foodDetail.carbohydrates - averageNutrientFood.carbohydrates;
      foodDetail.proteinsDifferent = foodDetail.proteins - averageNutrientFood.protein;
      foodDetail.fatDifferent = foodDetail.fat - averageNutrientFood.fat;
    }
    return {
      ...state,
      foodDetail,
    };
  },
  [actionTypes.getUserInfo]: (state, payload) => {
    return {
      ...state,
      ...payload,
    };
  },
});

export const FoodInquiryDuck = {
  storeName,
  actions,
  reducer
};
