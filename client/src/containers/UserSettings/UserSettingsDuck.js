import { isEmpty } from 'lodash';
import { createAction, createReducer } from '../../utils/store';
import UserService from '../../service/UserService';

const storeName = 'UserSettings';

// define action type
export const actionTypes = {
  requestGet: storeName + '/REQUEST_GET',
  succeedGet: storeName + '/SUCCEED_GET',
  requestUpdate: storeName + '/REQUEST_UPDATE',
  succeedUpdate: storeName + '/SUCCEED_UPDATE',
  failRequest: storeName + '/FAIL_REQUEST',
  toggleInitialFlag: storeName + '/TOGGLE_INITIAL_FLAG',
};

// define actions
const requestGet = createAction(actionTypes.requestGet);
const requestUpdate = createAction(actionTypes.requestUpdate);
const toggleInitialFlag = (value) => createAction(actionTypes.toggleInitialFlag, value);
const failRequest = (error) => createAction(actionTypes.failRequest, { error });
const succeedGet = (userSettings) => createAction(actionTypes.succeedGet, { userSettings });
const succeedUpdate = (userSettings) => createAction(actionTypes.succeedUpdate, { userSettings });

// define thunks
const initialize = () => async (dispatch) => {
  dispatch(requestGet);
  let userSettings, diseases, interests;
  let selectedDiseases, selectedInterests;

  try {
    diseases = await UserService.getAvailableDiseases();
    interests = await UserService.getAvailableInterests();
    userSettings = await UserService.getUserSettings();
  } catch(err) {
    dispatch(failRequest(err));
  }

  if (isEmpty(userSettings)) {
    selectedDiseases = [];
    selectedInterests = [];
    dispatch(toggleInitialFlag(true))
  } else {
    selectedDiseases = userSettings.diseases;
    selectedInterests = userSettings.interests;
    dispatch(toggleInitialFlag(false))
  }

  const settings = {
    diseases,
    interests,
    selectedDiseases,
    selectedInterests,
    firstName: userSettings.firstName,
    lastName: userSettings.lastName,
    gender: userSettings.gender,
    height: userSettings.height,
    weight: userSettings.weight,
  }

  dispatch(succeedGet(settings))
};

const updateUserSettings = (userSettings, history) => async (dispatch, getState) => {
  dispatch(requestUpdate);
  let response;
  const state = getState()[storeName];
  const updateMethod = state.isInitial 
    ? UserService.createUserSettings 
    : UserService.updateUserSettings;
  
  try {
    response = await updateMethod(userSettings);
  } catch (err) {
    dispatch(failRequest(err));
  }

  const settings = {
    selectedDiseases: response.diseases,
    selectedInterests: response.interests,
    firstName: response.firstName,
    lastName: response.lastName,
    gender: response.gender,
    height: response.height,
    weight: response.weight,
  };

  dispatch(succeedUpdate(settings));
  // Redirect back to dashboard
  history.push('/dashboard');
  window.location.reload();
}

// conveniently export actions
export const actions = {
  initialize,
  updateUserSettings,
};

export const initialState = {
  isInitial: true,
  isLoading: false,
  error: null,
  diseases: [],
  interests: [],
  selectedDiseases: [],
  selectedInterests: [],
  firstName: '',
  lastName: '',
  birthYear: null,
  gender: '',
  weight: null,
  height: null,
};

const reducer = createReducer(initialState, {
  [actionTypes.toggleInitialFlag]: (state, value) => {
    return {
      ...state,
      isInitial: value,
    }
  },
  [actionTypes.requestGet]: (state) => {
    return {
      ...state,
      isLoading: true,
    };
  },
  [actionTypes.succeedGet]: (state, payload) => {
    return {
      ...state,
      ...payload.userSettings,
      error: null,
      isLoading: false,
    }
  },
  [actionTypes.succeedUpdate]: (state, payload) => {
    return {
      ...state,
      ...payload.userSettings,
      error: null,
      isLoading: false,
    }
  },
  [actionTypes.failRequest]: (state, payload) => {
    return {
      ...state,
      error: payload.error,
      isLoading: false,
    }
  }
});

// selectors
const getSelectedDiseases = (state) => state[storeName].selectedDiseases;
const getSelectedInterests = (state) => state[storeName].selectedInterests;
const getAllDiseases = (state) => state[storeName].diseases;
const getAllInterests = (state) => state[storeName].interests;
const getIsInitial = (state) => state[storeName].isInitial;
const getFirstName = (state) => state[storeName].firstName;
const getLastName = (state) => state[storeName].lastName;
const getBirthYear = (state) => state[storeName].birthYear;
const getGender = (state) => state[storeName].gender;
const getWeight = (state) => state[storeName].weight;
const getHeight = (state) => state[storeName].height;

export const selectors = {
  getSelectedDiseases,
  getSelectedInterests,
  getAllDiseases,
  getAllInterests,
  getIsInitial,
  getFirstName,
  getLastName,
  getBirthYear,
  getGender,
  getWeight,
  getHeight,
}

export const UserSettingsDuck = {
  storeName,
  actions,
  reducer,
};
