import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
// Import reducers as we need
import foodIntake from './containers/Dashboard/duck';
import {dashboardDuck} from './containers/Dashboard/DashboardDuck';

export default combineReducers({
  form: formReducer,
  foodIntake,
  [dashboardDuck.storeName]: dashboardDuck.reducer,
});
