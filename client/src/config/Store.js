import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { reducer as form } from 'redux-form';
import thunk from 'redux-thunk';
import { isProd } from './Utils';
import { reducers } from './Reducers';

if (!isProd) {
  console.log('--- is production:', isProd, process.env.NODE_ENV);
}

export const store = createStore(
  combineReducers({
    form,
    ...reducers
  })
    , {} /* initial state */
    , compose(
    applyMiddleware(thunk),
    // If you are using the devToolsExtension, you can add it here also
    (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,

  )
);
