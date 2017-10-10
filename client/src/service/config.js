import axios from 'axios';
import initializeMockAPI from './mockAPI/api';
import { API_BASE_URL } from '../constants';

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10 * 60 * 60,
  headers: {
    'Nanum-Project': 'Hello Nanum :)'
  }
});

const handleError = error => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }
  console.log(error.config);

  return Promise.reject(error);
};

// Add a response interceptor
client.interceptors.response.use(response => response, handleError);

if (process.env.NODE_ENV === 'development' ) {
  initializeMockAPI(client);
}

if(process.env.NODE_ENV === 'test') {
  // No delay when in test mode
  initializeMockAPI(client, 0);
}

export default client;