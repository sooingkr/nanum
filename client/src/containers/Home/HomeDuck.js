import { createAction, createReducer } from '../../utils/store';

// import service

const storeName = 'HomeDuck';

// define action type
export const actionTypes = {
  // initialize: storeName + '/initialize',
  toggleChatBox: storeName + '/toggleChatBox',
};

// define action
// export const initialize = () => dispatch => {
// };

const toggleChatBox = () => dispatch => {
  dispatch(createAction(actionTypes.toggleChatBox));
};

// conveniently export actions
const actions = {
  // initialize,
  toggleChatBox
};

export const initialState = {
  openChatBox: false
};

const reducer = createReducer(initialState, {
  // [actionTypes.initialize]: (state, currentUser) => {
  //   return {};
  // },

  [actionTypes.toggleChatBox]: (state) => {

    return {
      ...state,
      openChatBox: !state.openChatBox
    };
  }
});

export const homeDuck = {
  storeName,
  reducer,
  actions
};