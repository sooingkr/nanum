import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { DashboardDuck, actionTypes } from '../DashboardDuck';
import UserService from '../../../service/UserService';
import FoodService from '../../../service/FoodService';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('dashboard actions', () => {
  it('should create an action to openDialog', () => {
    const expectedAction = { 
      type: actionTypes.openDialog, 
      payload: {
        mealTime: 'dinner',  
      } 
    };
    expect(DashboardDuck.actions.openDialog('dinner')).toEqual(expectedAction);
  });

  it('should create an action to closeDialog', () => {
    const expectedAction = { type: actionTypes.closeDialog };
    expect(DashboardDuck.actions.closeDialog()).toEqual(expectedAction);
  });

});

describe('dashboard async actions', () => {
  it('creates DashboardDuck/initialize action when initializing has been done', async () => {
    const expectedAction = [{ 
      type: actionTypes.initialize,
      payload: {
        currentUser: await UserService.getCurrentUser(),
        foodIntakeTracking: {
          ...(await FoodService.getFoodIntakeTracking())
        },
      }
    }];
    const store = mockStore({ currentUser: {} });
    return store.dispatch(DashboardDuck.actions.initialize()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    })
  });
});