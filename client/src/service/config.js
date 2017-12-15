import axios from 'axios';
import initializeMockAPI from './mockAPI/api';
import { 
  API_BASE_PATH,
} from '../constants';

const _baseUrl = API_BASE_PATH;

const client = axios.create({
  baseURL: _baseUrl,
  timeout: 10 * 60 * 60,
  withCredentials: true,
});

const handleError = error => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log('-- error.response.data', error.response.data);
    console.log('-- error.response.status', error.response.status);
    console.log('-- error.response.headers', error.response.headers);
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
client.interceptors.response.use(response => {
  console.log(response);
  // const { headers, data }= response;
  // console.log(isContentTypeHtml(headers['content-type']));  
  // console.log(data);
  // console.log(typeof data);
  // if (isContentTypeHtml(headers['content-type']) && isRequiredLogin(data)) {
    // console.log('okie');
    // window.location.href = '/';
    // return;
  // }
  // response, handleError
  return response;
}, handleError);

// client.interceptors.response.use(response => response, handleError);

function isContentTypeHtml(contentType) {
  return contentType === 'text/html;charset=UTF-8';
}

function isRequiredLogin(string) {
  return string.indexOf('location.href = "/realAuthentication.do?') !== -1;
}

if(process.env.NODE_ENV === 'mock') {
  // When in mock api mode, add some default delay to simulate network
  initializeMockAPI(client);
}

if(process.env.NODE_ENV === 'test') {
  // No delay when in test mode
  initializeMockAPI(client, 0);
}

export default client;