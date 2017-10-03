import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
// Import reducers as we need
import { DashboardDuck } from './containers/Dashboard/DashboardDuck';

export default combineReducers({
  form: formReducer,
  [DashboardDuck.storeName]: DashboardDuck.reducer,
});
