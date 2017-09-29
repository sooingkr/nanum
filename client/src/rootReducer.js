import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
// Import reducers as we need
import { dashboardDuck } from './containers/Dashboard/duck';

export default combineReducers({
  form: formReducer,
  [dashboardDuck.storeName]: dashboardDuck.reducer,
});
