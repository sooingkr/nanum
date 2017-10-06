import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
// Import reducers as we need
import { DashboardDuck } from './containers/Dashboard/DashboardDuck';
import {homeDuck} from "./containers/Home/HomeDuck";

export default combineReducers({
  form: formReducer,
  [homeDuck.storeName]: homeDuck.reducer,
  [DashboardDuck.storeName]: DashboardDuck.reducer,
});
