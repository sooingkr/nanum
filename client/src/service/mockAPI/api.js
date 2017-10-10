import MockAdapter from 'axios-mock-adapter';
import { 
  currentUser, 
  foodIntakeTracking,
  searchFood,
  foodSuggestions,
  login,
  checkValidToken,
} from './responses';
import { API_BASE_URL } from '../../constants';

// Call this function with the default instance of axios when in development
export default function initializeMockAPI(client, delay=500) {
  const mock = new MockAdapter(client, { delayResponse: delay });
  
  // Mock endpoints
  mock.onGet(`${API_BASE_URL}/user/current`).reply(200, currentUser());
  mock.onGet(`${API_BASE_URL}/tracking`).reply(200, foodIntakeTracking());
  mock.onGet(`${API_BASE_URL}/foods/search`).reply(200, searchFood());
  mock.onGet(`${API_BASE_URL}/foods/suggest`).reply(200, foodSuggestions());
  mock.onPost(`${API_BASE_URL}/post-login`).reply(200, login());
  mock.onPost(`${API_BASE_URL}/check-valid-authorization-token`).reply(200, checkValidToken());
  return mock;
}