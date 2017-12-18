export const isProd = process.env.NODE_ENV === 'production';
export const notProd = !isProd;

export const createAction = (type, payload) => ({ type, payload });

export const createReducer = (initialState, handlers) => (state = initialState, action) => {

  if (handlers.hasOwnProperty(action.type)) {
    return handlers[action.type](state, action.payload);
  }

  return state;
};

