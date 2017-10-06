import axios from 'axios';
import initializeMockAPI from './mockAPI/api';

if (process.env.NODE_ENV === 'development' ) {
  initializeMockAPI(axios);
}

if(process.env.NODE_ENV === 'test') {
  // No delay when in test mode
  initializeMockAPI(axios, 0);
}

export default axios;