import { createAction, createReducer } from '../../utils/store';
import UserService from '../../service/UserService';
import { getAuth } from '../../utils/auth';

const storeName = 'App';

// define action type
export const actionTypes = {
  checkTokenValid: storeName + '/CHECK_TOKEN_VALID',
  failTokenValid: storeName + '/FAIL_TOKEN_VALID',
  successAuthenticate: storeName + '/SUCCESS_AUTHENTICATE',
};

// define actions
const checkTokenValid = () => createAction(actionTypes.checkTokenValid);
const successAuthenticate = () => createAction(actionTypes.successAuthenticate);
const failTokenValid = () => createAction(actionTypes.failTokenValid);

// define thunks
const initialize = () => async (dispatch) => {
  dispatch(checkTokenValid());
  // Get auth data from localstorage
  const auth = getAuth();
  // If auth not present, fail it
  if( !auth ) {
    dispatch(failTokenValid());
    return;
  }

  // Check token validity on Server
  const isValid = await UserService.checkValidToken(auth.token);
  if (isValid) {
    dispatch(successAuthenticate());
  } else {
    dispatch(failTokenValid());
  }
}

// conveniently export actions
export const actions = {
  checkTokenValid,
  successAuthenticate,
  failTokenValid,
  initialize,
};

export const initialState = {
  isAuthenticated: false,
};

const reducer = createReducer(initialState, {
  [actionTypes.checkTokenValid]: (state, payload) => {
    return state ;
  },
  [actionTypes.failTokenValid]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
    }
  },
  [actionTypes.successAuthenticate]: (state) => {
    return {
      ...state,
      isAuthenticated: true,
    }
  }
});

export const AppDuck = {
  storeName,
  actions,
  reducer
};
