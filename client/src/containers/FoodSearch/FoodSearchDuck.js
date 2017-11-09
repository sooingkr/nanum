import { createAction, createReducer } from '../../utils/store';
import { foodService } from '../../service/FoodService';

const storeName = 'FoodSearch';

// define action type
export const actionTypes = {
  requestSearch: storeName + '/REQUEST_FOOD_SEARCH',
  rejectSearch: storeName + '/REJECT_FOOD_SEARCH',
  failSearch: storeName + '/FAIL_FOOD_SEARCH',
  succeedSearch: storeName + '/SUCCEED_FOOD_SEARCH',
  resetSearch: storeName + '/RESET_FOOD_SEARCH',
};

// define actions
const requestSearch = (foodQuery) => createAction(actionTypes.requestSearch, { foodQuery });
const failSearch = (error) => createAction(actionTypes.failSearch, { error });
const succeedSearch = (results) => createAction(actionTypes.succeedSearch, { ...results });
const rejectSearch = createAction(actionTypes.rejectSearch);
const resetSearch = createAction(actionTypes.resetSearch);

// define thunks
const searchFood = (foodQuery, page) => async (dispatch, getState) => {
  const currentState = getState()[storeName];
  const currentQuery = currentState.foodQuery;
  const currentPage = currentState.page;
  const hasNextPage = currentState.list.hasNextPage;

  // if page not provided, default to current page
  if (!page) page = currentPage;

  // If the query if different, clear cache
  const isNewQuery = currentQuery !== foodQuery;
    
  const shouldFetch = hasNextPage && 
    (isNewQuery 
    || currentQuery === '' // Initial fetch
    || (!isNewQuery && page !== currentPage && currentQuery !== ''));
  
  // If query is different from previous query, 
  // reset redux store
  if (isNewQuery) {
    dispatch(resetSearch);
    dispatch(requestSearch(foodQuery));
  }

  let searchResponse;

  try {
    searchResponse = shouldFetch ? await foodService.searchFood(foodQuery, page) : { results: [] };
  } catch (error) {
    dispatch(failSearch(error));
  }

  if (searchResponse.results.length === 0) {
    // No results, reject
    dispatch(rejectSearch);
  } else {
    // Search success 
    dispatch(succeedSearch(searchResponse));
  }
}

// conveniently export actions
export const actions = {
  requestSearch,
  failSearch,
  succeedSearch,
  searchFood,
  resetSearch,
};

export const initialState = {
  foodQuery: '',
  error: {},
  hasError: false,
  isLoading: false,
  list: {
    hits: [],
    hasNextPage: true,
    page: -1,
    total: null,
  },
};

const reducer = createReducer(initialState, {
  [actionTypes.requestSearch]: (state, payload) => {
    return {
      ...state,
      foodQuery: payload.foodQuery,
      isLoading: true,
    }
  },
  [actionTypes.rejectSearch]: (state, payload) => {
    return {
      ...state,
      error: {},
      hasError: false,
      isLoading: false,
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
  [actionTypes.resetSearch]: (state, payload) => {
    return {
      ...state,
      foodQuery: '',
      error: {},
      hasError: false,
      isLoading: false,
      list: {
        hits: [],
        hasNextPage: true,
        page: -1,
        total: null,
      },
    }
  },
  [actionTypes.succeedSearch]: (state, payload) => {
    return {
      ...state,
      error: {},
      hasError: false,
      isLoading: false,
      list: {
        hits: [ 
          ...state.list.hits, 
          ...payload.results 
        ],
        page: state.list.page + 1,
        hasNextPage: payload.hasNextPage,
        total: payload.total,
      },
    }
  }
});

export const FoodSearchDuck = {
  storeName,
  actions,
  reducer
};
