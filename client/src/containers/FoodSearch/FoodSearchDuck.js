import { createAction, createReducer } from '../../utils/store';
// import FoodService from '../../service/FoodService';

const storeName = 'FoodSearch';

// define action type
export const actionTypes = {
  requestSearch: storeName + '/REQUEST_FOOD_SEARCH',
  failSearch: storeName + '/FAIL_FOOD_SEARCH',
  succeedSearch: storeName + '/SUCCEED_FOOD_SEARCH',
};

// define actions
const requestSearch = (foodQuery) => createAction(actionTypes.requestSearch, { foodQuery });
const failSearch = (error) => createAction(actionTypes.failSearch, { error });
const succeedSearch = (results) => createAction(actionTypes.succeedSearch, { results });

// define thunks
const searchFood = (foodQuery) => async (dispatch) => {
  // TODO
}

// conveniently export actions
export const actions = {
  requestSearch,
  failSearch,
  succeedSearch,
  searchFood,
};

export const initialState = {
  foodQuery: "",
  error: {},
  results: [],
};

const reducer = createReducer(initialState, {
  [actionTypes.requestSearch]: (state, payload) => {
    return {
      ...state,
      foodQuery: payload.foodQuery,
    }
  },
  [actionTypes.failSearch]: (state, payload) => {
    return {
      ...state,
      error: payload.error,
    }
  },
  [actionTypes.succeedSearch]: (state, payload) => {
    return {
      ...state,
      results: payload.results,
    }
  }
});

export const AppDuck = {
  storeName,
  actions,
  reducer
};
