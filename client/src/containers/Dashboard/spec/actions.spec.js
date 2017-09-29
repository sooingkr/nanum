import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { dashboardDuck, actionTypes } from '../duck';
import { getCurrentUser, getFoodIntakeTracking } from '../../../service/UserService';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('dashboard actions', () => {
  it('should create an action to toggleDialog', () => {
    const expectedAction = { type: actionTypes.toggleDialog };
    expect(dashboardDuck.actions.toggleDialog()).toEqual(expectedAction);
  });
});

describe('dashboard async actions', () => {
  it('creates DashboardDuck/initialize action when initializing has been done', async () => {
    const expectedAction = [{ 
      type: actionTypes.initialize,
      payload: {
        currentUser: await getCurrentUser(),
        foodIntakeTracking: await getFoodIntakeTracking(),
      }
    }];
    const store = mockStore({ currentUser: {} });
    return store.dispatch(dashboardDuck.actions.initialize()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    })
  });
});