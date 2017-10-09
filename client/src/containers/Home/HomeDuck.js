import { createAction, createReducer } from '../../utils/store';

// import service

const storeName = 'HomeDuck';

// define action type
export const actionTypes = {
  toggleChatBox: storeName + '/toggleChatBox'
};

// define action

const toggleChatBox = () => dispatch => {
  dispatch(createAction(actionTypes.toggleChatBox));
};

// conveniently export actions
const actions = {
  toggleChatBox,
};

export const initialState = {
  openChatBox: false
};

const reducer = createReducer(initialState, {

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