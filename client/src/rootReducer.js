import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
// Import reducers as we need
import { DashboardDuck } from './containers/Dashboard/DashboardDuck';
import { LoginDuck } from './containers/Login/LoginDuck';
import { AppDuck } from './containers/App/AppDuck';

export default combineReducers({
  form: formReducer,
  [AppDuck.storeName]: AppDuck.reducer,
  [DashboardDuck.storeName]: DashboardDuck.reducer,
  [LoginDuck.storeName]: LoginDuck.reducer,
});
