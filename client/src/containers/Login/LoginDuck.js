/**
 * Created by manhvu on 10/6/17.
 */
import { createAction, createReducer } from '../../utils/store';
import axios from '../../service/config';
import { API_BASE_PATH } from '../../constants';

// import service

export const storeName = 'Login';

// define action type
export const actionTypes = {
  login: storeName + '/login',
  logout: storeName + '/LOGOUT',
};

// define thunks
export const login = (formData, history) => async dispatch => {
  try {
    const res = await axios.post(`${API_BASE_PATH}/login`, formData);
    dispatch(createAction(actionTypes.login, res.data));

  } catch (err) {
    console.error('===== error while login:', err);
  }
};

// conveniently export actions
export const actions = {
  login,
};

export const initialState = {
};

const reducer = createReducer(initialState, {
});
export const LoginDuck = {
  storeName,
  actions,
  reducer
};
