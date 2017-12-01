import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { store } from './utils/AppUtils';
import ScrollToTop from './components/Common/ScrollToTop';
import App from './containers/App/App';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import 'font-awesome/css/font-awesome.css';
import './index.scss';

const AppView = () => (
  <Provider store={store}>
    <Router>
      <ScrollToTop>
        <App/>
      </ScrollToTop>
    </Router>
  </Provider>
);

ReactDOM.render(<AppView/>, document.getElementById('root'));
// registerServiceWorker();
