import MockAdapter from 'axios-mock-adapter';
import { 
  currentUser, 
  foodIntakeTracking,
  searchFood,
  foodSuggestions,
} from './responses';
import { API_BASE_URL } from '../../constants/api';

// Call this function with the default instance of axios when in development
export default function initializeMockAPI(client, delay=500) {
  const mock = new MockAdapter(client, { delayResponse: delay });
  
  // Mock endpoints
  mock.onGet(`${API_BASE_URL}/user/current`).reply(200, currentUser());
  mock.onGet(`${API_BASE_URL}/tracking`).reply(200, foodIntakeTracking());
  mock.onGet(`${API_BASE_URL}/foods/search`).reply(200, searchFood());
  mock.onGet(`${API_BASE_URL}/foods/suggest`).reply(200, foodSuggestions());
  return mock;
}