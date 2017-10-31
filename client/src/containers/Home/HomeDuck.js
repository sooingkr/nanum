import { createAction, createReducer } from '../../utils/store';

// import service

const storeName = 'Home';

//define state
export const initialState = {
  openChatBox: false,
  isTyping: false,
};

// define action type
export const actionTypes = {
  toggleChatBox: storeName + '/toggleChatBox',
  typingMessage: storeName + '/typingMessage'
};

// define action

const toggleChatBox = () => dispatch => {
  dispatch(createAction(actionTypes.toggleChatBox));
};

const typingMessage = (isTyping) => dispatch => {
  dispatch(createAction(actionTypes.typingMessage, isTyping));
};

// conveniently export actions
const actions = {
  toggleChatBox,
  typingMessage,
};

const reducer = createReducer(initialState, {

  [actionTypes.toggleChatBox]: (state) => {
    return {
      ...state,
      openChatBox: !state.openChatBox
    };
  },

  [actionTypes.typingMessage]: (state, isTyping) => {
    return {
      ...state,
      isTyping
    };
  },

});

export const HomeDuck = {
  storeName,
  reducer,
  actions
};