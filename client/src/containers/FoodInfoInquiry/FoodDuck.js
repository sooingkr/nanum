/**
 * Created by yenhua on 11/2/17.
 */
import { createAction, createReducer } from '../../utils/store';
import { foodService } from '../../service/FoodService';

// import service

export const storeName = 'FoodInquiryDuck';

export const initialState = {
  foodDetail: {},
  alternativeFoodDetails: []
};

// define action type
export const actionTypes = {
  getFoodDetail: storeName + '/GET_FOOD_DETAIL',
  getCarouselFoods: storeName + '/GET_CAROUSEL_FOOD'
};

// define thunks
export const getFoodDetailById = foodId => dispatch => {
  foodService.foodDetail(foodId).then(data => {
    dispatch(createAction(actionTypes.getFoodDetail, data));
  });
};

// export const getAlternativeFood => dispatch => {
//   foodService.
// };


// conveniently export actions
export const actions = {
  getFoodDetailById
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
