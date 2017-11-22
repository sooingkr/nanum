import { isEmpty } from 'lodash';
import { createAction, createReducer } from '../../utils/store';
import UserService from '../../service/UserService';

const storeName = 'UserSettings';

// define action type
export const actionTypes = {
  requestGet: storeName + '/REQUEST_GET',
  succeedGet: storeName + '/SUCCEED_GET',
  requestSave: storeName + '/REQUEST_SAVE',
  succeedSave: storeName + '/SUCCEED_SAVE',
  failRequest: storeName + '/FAIL_REQUEST',
  toggleInitialFlag: storeName + '/TOGGLE_INITIAL_FLAG',
};

// define actions
const requestGet = createAction(actionTypes.requestGet);
const requestSave = createAction(actionTypes.requestSave);
const toggleInitialFlag = (value) => createAction(actionTypes.toggleInitialFlag, value);
const failRequest = (error) => createAction(actionTypes.failRequest, { error });
const succeedGet = (userSettings) => createAction(actionTypes.succeedGet, { userSettings });
const succeedSave = (userSettings) => createAction(actionTypes.succeedSave, { userSettings });

// define thunks
const initialize = () => async (dispatch) => {
  dispatch(requestGet);
  let userSettings, diseases, interests;
  let selectedDiseases, selectedInterests;

  try {
    diseases = await UserService.getUserDiseases();
    interests = await UserService.getUserInterests();
    userSettings = await UserService.getUserSettings();
  } catch(err) {
    dispatch(failRequest(err));
  }

  if (isEmpty(userSettings)) {
    selectedDiseases = diseases;
    selectedInterests = interests;
    dispatch(toggleInitialFlag(true));
  } else {
    selectedDiseases = userSettings.diseases;
    selectedInterests = userSettings.interests;
    dispatch(toggleInitialFlag(false));
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

// conveniently export actions
export const actions = {
  initialize,
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
  [actionTypes.failRequest]: (state, payload) => {
    return {
      ...state,
      error: payload.error,
      isLoading: false,
    }
  }
});

// selectors
const getSelectedDiseases = (state) => 
  state[storeName].selectedDiseases.map(disease => {
    return { id: disease.id, label: disease.name };
  });

const getSelectedInterests = (state) => 
  state[storeName].selectedInterests.map(interest => {
    return { id: interest.id, label: interest.name };
  });

const getAllDiseases = (state) => 
  state[storeName].diseases.map(disease => {
    return { id: disease.id, label: disease.name };
  });

const getAllInterests = (state) => 
  state[storeName].interests.map(interest => {
    return { id: interest.id, label: interest.name };
  });

const getIsInitial = (state) => state[storeName].isInitial;

const selectors = {
  getSelectedDiseases,
  getSelectedInterests,
  getAllDiseases,
  getAllInterests,
  getIsInitial,
}

export const UserSettingsDuck = {
  storeName,
  actions,
  reducer,
  selectors,
};
