/**
 * Created by yenhua on 11/2/17.
 */
import { createAction, createReducer } from '../../utils/store';
import FoodService from '../../service/FoodService';

// import service

export const storeName = 'FoodInquiryDuck';

export const initialState = {
  foodDetail: {},
};

// define action type
export const actionTypes = {
  getFoodDetail: storeName + '/GET_FOOD_DETAIL',
};

// define thunks
export const getFoodDetailData = (foodId) => dispatch => {
    FoodService.foodDetail(foodId).then(data => {
      dispatch(createAction(actionTypes.getFoodDetail, data));
    });
};


// conveniently export actions
export const actions = {
  getFoodDetailData
};


const reducer = createReducer(initialState, {
  [actionTypes.getFoodDetail]: (state, foodDetail) => {
    return {
      ...state,
      foodDetail,
    };
  },
});

export const FoodInquiryDuck = {
  storeName,
  actions,
  reducer
};
