import { createAction, createReducer } from '../../utils/store';

// import service

const storeName = 'HomeDuck';

// define action type
export const actionTypes = {
  toggleChatBox: storeName + '/toggleChatBox',
  typingMessage: storeName + '/typingMessage'
};

// define action

const toggleChatBox = () => dispatch => {
  dispatch(createAction(actionTypes.toggleChatBox));
};

const typingMessage= () => dispatch => {
  dispatch(createAction(actionTypes.typingMessage));
};

// conveniently export actions
const actions = {
  toggleChatBox,
  typingMessage,
};

export const initialState = {
  openChatBox: false,
  typingMessage: false,
};

const reducer = createReducer(initialState, {

  [actionTypes.toggleChatBox]: (state) => {
    return {
      ...state,
      openChatBox: !state.openChatBox
    };
  },

  [actionTypes.typingMessage]: (state) => {
    return {
      ...state,
      typingMessage: !state.typingMessage
    };
  },

});

export const homeDuck = {
  storeName,
  reducer,
  actions
};