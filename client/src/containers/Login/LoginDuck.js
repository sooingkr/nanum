/**
 * Created by manhvu on 10/6/17.
 */
import { createAction, createReducer } from '../../utils/store';
import axios from '../../service/config';

export const storeName = 'Login';

export const actionTypes = {
  login: storeName + '/LOGIN',
  logout: storeName + '/LOGOUT',
  loginSuccess: storeName + '/LOGIN_SUCCESS',
  loginFail: storeName + '/LOGIN_FAIL',
};


// define thunks
export const login = (formData, history) => async dispatch => {
  try {
    const res = await axios.post(`/authenticate`, formData);

    if (res.data) {
      const loginInfo = {isAuthenticated: res.data, userInfo: formData};
      dispatch(createAction(actionTypes.login, loginInfo));
      history.push('/dashboard');
    }
  } catch (err) {
    console.error('===== error while login:', err);
  }
};

// conveniently export actions
export const actions = {
  login,
};

export const initialState = {
  isAuthenticated: false,
  userInfo: {}
};

const reducer = createReducer(initialState, {
  [actionTypes.login]: (state, payload) => {
    return {...state, ...payload};
  }
});
export const LoginDuck = {
  storeName,
  actions,
  reducer
};
