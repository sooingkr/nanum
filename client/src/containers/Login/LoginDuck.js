/**
 * Created by manhvu on 10/6/17.
 */
import { createAction, createReducer } from '../../utils/store';
import UserService from '../../service/UserService';
import { AppDuck } from '../App/AppDuck';

// import service

export const storeName = 'Login';

// define action type
export const actionTypes = {
  requestLogin: storeName + '/REQUEST_LOGIN',
  succeedLogin: storeName + '/SUCCEED_LOGIN',
  failLogin: storeName + '/FAIL_LOGIN',
  logout: storeName + '/LOGOUT',
};

// define actions
const requestLogin = () => createAction(actionTypes.requestLogin);
const succeedLogin = (decodedToken) => createAction(actionTypes.succeedLogin, { decodedToken });
const failLogin = (error) => createAction(actionTypes.failLogin, { error });

// define thunks
export const login = ({ email, password }) => async dispatch => {
  dispatch(requestLogin());
  
  try {
    const userData = await UserService.loginUser(email, password);
    dispatch(succeedLogin(userData));
    dispatch(AppDuck.actions.succeedAuthenticate());
  } catch(error) {
    dispatch(failLogin(error));
  }
};

// conveniently export actions
export const actions = {
  login,
  succeedLogin,
};

export const initialState = {
  user: {},
  isFetching: false,
  error: {},
};

const reducer = createReducer(initialState, {
  [actionTypes.requestLogin]: (state) => {
    return {
      ...state,
      isFetching: true,
    };
  },
  [actionTypes.failLogin]: (state, payload) => {
    return {
      ...state,
      isFetching: false,
      error: payload.error,
    }
  },
  [actionTypes.succeedLogin]: (state, payload) => {
    return {
      ...state,
      user: {
        id: payload.decodedToken.id,
        username: payload.decodedToken.username,
      },
      isFetching: false,
      error: {},
    };
  }
});

const getUser = (state) => state[storeName].user;

export const LoginDuck = {
  storeName,
  actions,
  reducer
};

export const selectors = {
  getUser,
};