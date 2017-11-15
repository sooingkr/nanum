import { createAction, createReducer } from '../../utils/store';

const storeName = 'App';

// define action type
export const actionTypes = {
  checkTokenValid: storeName + '/CHECK_TOKEN_VALID',
  failTokenValid: storeName + '/FAIL_TOKEN_VALID',
  toggleModal: storeName + '/TOGGLE_MODAL',
  failInitialize: storeName + '/FAIL_INITIALIZE',
  clearInitializeError: storeName + '/CLEAR_INITIALIZE_ERROR',
};

// define actions
const checkTokenValid = () => createAction(actionTypes.checkTokenValid);
const failTokenValid = () => createAction(actionTypes.failTokenValid);

// define thunks
const initialize = () => async (dispatch) => {
  dispatch(createAction(actionTypes.clearInitializeError));
};

export const toggleModal = modalId => dispatch => {
  dispatch(createAction(actionTypes.toggleModal, modalId));
};

// conveniently export actions
export const actions = {
  checkTokenValid,
  failTokenValid,
  initialize,
  toggleModal,
};

export const initialState = {
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
  [actionTypes.toggleModal]: (state, openModalId) => {
    if (state.openModalId === openModalId) {
      openModalId = '';
    }
    return {
      ...state,
      openModalId
    }
  },
  [actionTypes.failInitialize]: (state, initializeError) => {
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
