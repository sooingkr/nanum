import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
// Import reducers as we need
import { DashboardDuck } from './containers/Dashboard/DashboardDuck';
import { LoginDuck } from './containers/Login/LoginDuck';
import { AppDuck } from './containers/App/AppDuck';
import {homeDuck} from "./containers/Home/HomeDuck";

export default combineReducers({
  form: formReducer,
  [AppDuck.storeName]: AppDuck.reducer,
  [homeDuck.storeName]: homeDuck.reducer,
  [DashboardDuck.storeName]: DashboardDuck.reducer,
  [LoginDuck.storeName]: LoginDuck.reducer,
});
