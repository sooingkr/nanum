import MockAdapter from 'axios-mock-adapter';
import { 
  tracking,
  searchFood,
  login,
  checkValidToken,
} from './responses';
import { API_BASE_PATH } from '../../constants';

// Call this function with the default instance of axios when in development
export default function initializeMockAPI(client, delay=500) {
  const mock = new MockAdapter(client, { delayResponse: delay });
  
  // Mock endpoints
  mock.onGet(`${API_BASE_PATH}/tracking`).reply(200, tracking());
  mock.onGet(`${API_BASE_PATH}/foods/search`).reply(200, searchFood());
  mock.onPost(`${API_BASE_PATH}/post-login`).reply(200, login());
  mock.onPost(`${API_BASE_PATH}/check-valid-authorization-token`).reply(200, checkValidToken());
  return mock;
}