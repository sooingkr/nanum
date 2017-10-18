import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
// Import reducers as we need
import { DashboardDuck } from './containers/Dashboard/DashboardDuck';
import { LoginDuck } from './containers/Login/LoginDuck';
import { AppDuck } from './containers/App/AppDuck';
import { HomeDuck } from './containers/Home/HomeDuck';
import { FoodSearchDuck } from './containers/FoodSearch/FoodSearchDuck';

export default combineReducers({
  form: formReducer,
  [AppDuck.storeName]: AppDuck.reducer,
  [HomeDuck.storeName]: HomeDuck.reducer,
  [DashboardDuck.storeName]: DashboardDuck.reducer,
  [LoginDuck.storeName]: LoginDuck.reducer,
  [FoodSearchDuck.storeName]: FoodSearchDuck.reducer
});
