import { isEmpty, isObject } from 'lodash';
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
  let userSettings, diseases, interests, allergies;
  let selectedDiseases, selectedInterests, selectedAllergies;

  try {
    diseases = await UserService.getAvailableDiseases();
    allergies = await UserService.getAvailableAllergies();
    interests = await UserService.getAvailableInterests();
    userSettings = await UserService.getUserSettings();
  } catch(err) {
    dispatch(failRequest(err));
  }

  if (!userSettings.data) {
    userSettings.data = {};
  }

  if (isEmpty(userSettings.data) || !isObject(userSettings.data)) {
    selectedDiseases = [];
    selectedInterests = [];
    dispatch(toggleInitialFlag(true))
  } else {
    selectedDiseases = userSettings.data.diseases;
    selectedAllergies = userSettings.data.allergies;
    selectedInterests = userSettings.data.interests;
    dispatch(toggleInitialFlag(false))
  }

  const { 
    firstName = '', 
    lastName = '', 
    gender, height, weight, birthYear 
  } = userSettings.data;
  
  const settings = {
    diseases: diseases.data,
    interests: interests.data,
    allergies: allergies.data,
    selectedDiseases,
    selectedAllergies,
    selectedInterests,
    firstName,
    lastName,
    gender,
    height,
    weight,
    birthYear,
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

  const { diseases, allergies, interests, firstName, lastName, gender, weight, height } = response.data;
  const settings = {
    selectedDiseases: diseases,
    selectedAllergies: allergies,
    selectedInterests: interests,
    firstName,
    lastName,
    gender,
    height,
    weight,
  };

  dispatch(succeedUpdate(settings));
  // Redirect back to dashboard
  history.push('/dashboard');
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
  allergies: [],
  selectedDiseases: [],
  selectedInterests: [],
  firstName: '',
  lastName: '',
  birthYear: null,
  gender: 'NA',
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
const getSelectedAllergies = (state) => state[storeName].selectedAllergies;
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
const getAllergies = (state) => state[storeName].allergies;

export const selectors = {
  getSelectedDiseases,
  getSelectedAllergies,
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
  getAllergies,
}

export const UserSettingsDuck = {
  storeName,
  actions,
  reducer,
};
