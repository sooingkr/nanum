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
  return Promise.reject(error);
};

// Add a response interceptor
client.interceptors.response.use(response => {
  const { headers, data }= response;
  if (isContentTypeHtml(headers['content-type']) && isRequiredLogin(data)) {
    window.location.href = '#introduce';
    return Promise.reject(response);
  }
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