import { createAction, createReducer } from '../../utils/store';
import FoodService from '../../service/FoodService';
import { DEFAULT_PAGINATE_SIZE } from '../../constants';

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
  const cachedQuery = currentState.foodQuery;
  const currentPage = currentState.list.page;
  const hasNextPage = currentState.list.hasNextPage;  
  page = parseInt(page, 10);
  // if page not provided, default to current page + 1
  if (!page) page = currentPage + 1;

  const isNewQuery = cachedQuery !== foodQuery;
  const shouldFetch = hasNextPage && (
    (isNewQuery && foodQuery !== '') // new, non-blank query
    || (!isNewQuery && page !== currentPage && foodQuery !== '')); // same query, new page
  
  // If query is different from previous query, 
  // reset redux store
  if (isNewQuery) {
    dispatch(resetSearch);
  }

  let searchResponse;
  try {
    dispatch(requestSearch(foodQuery));
    searchResponse = shouldFetch 
      ? await FoodService.searchFood(foodQuery, page, DEFAULT_PAGINATE_SIZE) 
      : { content: [] };
  } catch (error) {
    dispatch(failSearch(error));
  }

  if (searchResponse.content.length === 0) {
    // No results, reject
    dispatch(rejectSearch);
  } else {
    // Search success 
    dispatch(succeedSearch(searchResponse.data));
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
          ...payload.content 
        ],
        page: state.list.page + 1,
        hasNextPage: !payload.last,
        total: payload.totalElements,
      },
    }
  }
});

export const FoodSearchDuck = {
  storeName,
  actions,
  reducer
};
