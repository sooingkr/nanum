import MockAdapter from 'axios-mock-adapter';
import { 
  tracking,
  searchFood,
  login,
  checkValidToken,
} from './responses';
import { API_BASE_URL } from '../../constants';

// Call this function with the default instance of axios when in development
export default function initializeMockAPI(client, delay=500) {
  const mock = new MockAdapter(client, { delayResponse: delay });
  
  // Mock endpoints
  mock.onGet(`${API_BASE_URL}/tracking`).reply(200, tracking());
  mock.onGet(`${API_BASE_URL}/foods/search`).reply(200, searchFood());
  mock.onPost(`${API_BASE_URL}/post-login`).reply(200, login());
  mock.onPost(`${API_BASE_URL}/check-valid-authorization-token`).reply(200, checkValidToken());
  return mock;
}