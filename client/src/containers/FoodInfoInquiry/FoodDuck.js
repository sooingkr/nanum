/**
 * Created by yenhua on 11/2/17.
 */
import { createAction, createReducer } from '../../utils/store';
import FoodService from '../../service/FoodService';
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
  let foodDetail;
  let hasUserInfo = false;

  try {
    foodDetail = await FoodService.foodDetail(foodId);
    dispatch(createAction(actionTypes.getFoodDetail, {...initialState.foodDetail, ...foodDetail.data}));
    if (foodDetail.data.isAuthenticate) {
      hasUserInfo = true;
    }

    dispatch(createAction(actionTypes.getUserInfo, {
      hasUserInfo,
      status: foodDetail.data.isAuthenticate
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
    foodDetail.carbohydratesDifferent = foodDetail.carbohydrates - foodDetail.avgCarbohydrates;
    foodDetail.proteinsDifferent = foodDetail.proteins - foodDetail.avgProteins;
    foodDetail.fatDifferent = foodDetail.fat - foodDetail.avgFat;
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
