import { dashboardDuck, actionTypes } from '../duck';

describe('dashboard reducer', () => {
  it('should return the initial state', () => {
    expect(dashboardDuck.reducer(undefined, {})).toEqual({
      currentUser: {},
      foodIntakeTracking: {},
      showDialog: false,
    });
  });

  it('should handle DashboardDuck/toggleDialog', () => {
    expect(dashboardDuck.reducer([], {
      type: actionTypes.toggleDialog,
    }
    )).toEqual({ showDialog: true })
  });

  it('should handle DashboardDuck/initialize', () => {
    const expectedState = {
      currentUser: { mock: "Some mock" }, foodIntakeTracking: { mock: "Some other mock" } 
    };
    expect(dashboardDuck.reducer([], {
      type: actionTypes.initialize,
      payload: expectedState
    }
    )).toEqual(expectedState);
  })
})