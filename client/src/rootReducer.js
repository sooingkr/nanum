import { combineReducers } from 'redux';
// Import reducers as we need
import foodIntake from './containers/Dashboard/duck';

export default combineReducers({
  foodIntake,
});
