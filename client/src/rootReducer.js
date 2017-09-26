import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
// Import reducers as we need
import foodIntake from './containers/DashboardPage/duck';

export default combineReducers({
  foodIntake,
  routing: routeReducer,
});
