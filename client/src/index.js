import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './index.scss';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';

const store = configureStore();
const AppView = () => (
  <Provider store={store}>
    <div>
      Hello World
    </div>
  </Provider>
);

ReactDOM.render(<AppView />, document.getElementById('root'));
registerServiceWorker();
