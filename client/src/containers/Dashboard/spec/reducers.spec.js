import { DashboardDuck, actionTypes } from '../DashboardDuck';
import _ from 'lodash';

describe('dashboard reducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      currentUser: {},
      breakfast: [],
      lunch: [],
      dinner: [],
      calories: {},
      foodSuggestions: {},
      showDialog: false,
      whichDialog: "",
    };
  });

  it('should return the initial state', () => {
    expect(DashboardDuck.reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle DashboardDuck/openDialog', () => {
    const expectedState = {
      ...initialState,
      showDialog: true,
      whichDialog: "dinner",
    };

    expect(DashboardDuck.reducer(initialState, {
      type: actionTypes.openDialog,
      payload: { mealTime: 'dinner' },
    }
    )).toEqual(expectedState)
  });

  it('should handle DashboardDuck/closeDialog', () => {
    const expectedState = {
      ...initialState,
      showDialog: false,
    };

    expect(DashboardDuck.reducer(initialState, {
      type: actionTypes.closeDialog,
    }
    )).toEqual(expectedState);
  });

  it('should handle DashboardDuck/initialize', () => {
    const payloadBody = {
      currentUser: {"mock": "Some mock"}, 
      foodIntakeTracking: {
        breakfast: [], 
        lunch: [],
        dinner: [], 
        calories: {}, 
      },
    };

    const expectedState = {
      currentUser: {"mock": "Some mock"},
      breakfast: [],
      lunch: [],
      dinner: [],
      calories: {},
      showDialog: false,
      whichDialog: "",
    }

    expect(DashboardDuck.reducer(initialState, {
      type: actionTypes.initialize,
      payload: { 
        ...payloadBody 
      }
    }
    )).toEqual(expectedState);
  })
})