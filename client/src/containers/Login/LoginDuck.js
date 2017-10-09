/**
 * Created by manhvu on 10/6/17.
 */
import { createAction, createReducer } from '../../utils/store';
import UserService from '../../service/UserService';
import jwtDecode from 'jwt-decode';

// import service

export const storeName = 'LoginDuck';

// define action type
export const actionTypes = {
  initialize: storeName + '/initialize',
};

// define action
export const login = ({username, password}) => dispatch => {
  UserService.loginUser(username, password).then(res => {
    const s = res.split(' ')[1];
    const dc = jwtDecode(s);

    dispatch(createAction(actionTypes.initialize, dc));
  });
};

// conveniently export actions
export const actions = {
  login,
};

export const initialState = {
  user: {}
};

const reducer = createReducer(initialState, {
  [actionTypes.initialize]: (state, user) => {
    return { ...state, user };
  }
});

export const LoginDuck = {
  storeName,
  actions,
  reducer
};
