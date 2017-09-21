import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './index.css';
import './index.scss';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import { store } from './config/Store';

import {HomePage} from './home-page/HomePage';

const AppView = () => (
  <Provider store={store}>
    <div>
      <HomePage/>
    </div>
  </Provider>
);

ReactDOM.render(<AppView />, document.getElementById('root'));
registerServiceWorker();
