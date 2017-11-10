/**
 * Created by manhvu on 10/6/17.
 */
import { createAction, createReducer } from '../../utils/store';
import axios from '../../service/config';

export const storeName = 'Login';

export const actionTypes = {
  loginRequest: storeName + '/LOGIN_REQUEST',
  logout: storeName + '/LOGOUT',
  loginSuccess: storeName + '/LOGIN_SUCCESS',
  loginFail: storeName + '/LOGIN_FAIL',
};

// Define actions
const loginRequest = () => createAction(actionTypes.loginRequest);
const logout = () => createAction(actionTypes.logout);
const loginSuccess = (loginInfo) => createAction(actionTypes.loginSuccess, loginInfo);
const loginFail = (error) => createAction(actionTypes.loginFail, {error});

// Define thunks
const login = (formData, history) => async dispatch => {
  dispatch(loginRequest());
  try {
    const res = await axios.post(`/authenticate`, formData);
    console.log(res);
    const isAuthenticated = res.data;
    if (isAuthenticated) {
      dispatch(loginSuccess({
        isAuthenticated, 
        userInfo: formData
      }));
      history.push('/dashboard');
    }
  } catch (err) {
    dispatch(loginFail(err));
  }
};

// conveniently export actions
export const actions = {
  login,
  logout,
  loginRequest,
  loginSuccess,
  loginFail
};

export const initialState = {
  isAuthenticated: false,
  userInfo: {},
  error: null,
  isFetching: false,
};

const reducer = createReducer(initialState, {
  [actionTypes.loginRequest]: (state) => {
    return {
      ...state, 
      isFetching: true,
    };
  },
  [actionTypes.loginFail]: (state, payload) => {
    return {
      ...state,
      isAuthenticated: false,
      error: payload.error,
      isFetching: false,
    }
  },
  [actionTypes.loginSuccess]: (state, payload) => {
    return {
      ...state,
      error: null,
      isFetching: false,
      isAuthenticated: payload.isAuthenticated,
      userInfo: payload.userInfo,
    }
  }
});
export const LoginDuck = {
  storeName,
  actions,
  reducer
};
