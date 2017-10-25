import { createAction, createReducer } from '../../utils/store';
import FoodService from '../../service/FoodService';

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
const searchFood = (foodQuery, page) => async (dispatch) => {
  // Init search query
  dispatch(requestSearch(foodQuery));
  // Make search api request
  let searchResult;

  try {
    searchResult = await FoodService.searchFood(foodQuery, page);
  } catch (error) {
    dispatch(failSearch(error));
  }

  // Search success 
  dispatch(succeedSearch(searchResult));
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
  hasError: false,
  hits: [],
  page: 0,
  isLoading: false,
};

const reducer = createReducer(initialState, {
  [actionTypes.requestSearch]: (state, payload) => {
    return {
      ...state,
      foodQuery: payload.foodQuery,
      isLoading: true,
    }
  },
  [actionTypes.failSearch]: (state, payload) => {
    return {
      ...state,
      error: payload.error,
      hasError: true,
      isLoading: false,
    }
  },
  [actionTypes.succeedSearch]: (state, payload) => {
    return {
      ...state,
      hits: [ 
        ...state.hits, 
        ...payload.results 
      ],
      error: {},
      page: state.page + 1,
      hasError: false,
      isLoading: false,
    }
  }
});

export const FoodSearchDuck = {
  storeName,
  actions,
  reducer
};
