import { createAction, createReducer } from '../../utils/store';
import UserService from '../../service/UserService';
import { getAuth } from '../../utils/auth';

const storeName = 'App';

// define action type
export const actionTypes = {
  checkTokenValid: storeName + '/CHECK_TOKEN_VALID',
  failTokenValid: storeName + '/FAIL_TOKEN_VALID',
  successAuthenticate: storeName + '/SUCCESS_AUTHENTICATE',
  toggleModal: storeName + '/TOGGLE_MODAL',
  initializeError: storeName + '/initializeError',
  clearInitializeError: storeName + '/clearInitializeError',
};

// define actions
const checkTokenValid = () => createAction(actionTypes.checkTokenValid);
const successAuthenticate = () => createAction(actionTypes.successAuthenticate);
const failTokenValid = () => createAction(actionTypes.failTokenValid);

// define thunks
const initialize = () => async (dispatch) => {
  dispatch(createAction(actionTypes.clearInitializeError));

  dispatch(checkTokenValid());
  // Get auth data from localstorage
  const auth = getAuth();
  // If auth not present, fail it
  if( !auth ) {
    dispatch(failTokenValid());
    return;
  }

  // Check token validity on Server
  try {
    const isValid = await UserService.checkValidToken(auth.token);
    if (isValid) {
      dispatch(successAuthenticate());
    } else {
      dispatch(failTokenValid());
    }
  } catch (error) {
    const errObj = {
      status: null,
      statusText: null,
      msg: 'Token is not valid',
    };

    if (error.response) {
      errObj.status = error.response.status;
      errObj.statusText = error.response.statusText;
    }

    dispatch(createAction(actionTypes.initializeError, errObj));
    dispatch(toggleModal('modal-app-error'));
  }
};

export const toggleModal = modalId => dispatch => {
  dispatch(createAction(actionTypes.toggleModal, modalId));
};

// conveniently export actions
export const actions = {
  checkTokenValid,
  successAuthenticate,
  failTokenValid,
  initialize,
  toggleModal,
};

export const initialState = {
  isAuthenticated: false,
  openModalId: '',
  initializeError: null,
};

const reducer = createReducer(initialState, {
  [actionTypes.checkTokenValid]: (state, payload) => {
    return state ;
  },
  [actionTypes.failTokenValid]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
    }
  },
  [actionTypes.successAuthenticate]: (state) => {
    return {
      ...state,
      isAuthenticated: true,
    }
  },
  [actionTypes.toggleModal]: (state, openModalId) => {
    if (state.openModalId === openModalId) {
      openModalId = '';
    }
    return {
      ...state,
      openModalId
    }
  },
  [actionTypes.initializeError]: (state, initializeError) => {
    return {
      ...state,
      initializeError
    }
  },
  [actionTypes.clearInitializeError]: (state) => {
    return {
      ...state,
      initializeError: null
    }
  }
});

export const AppDuck = {
  storeName,
  actions,
  reducer
};
