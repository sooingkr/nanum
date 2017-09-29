import MockAdapter from 'axios-mock-adapter';
import { 
  currentUser, 
  foodIntakeTracking,
} from './responses';
import { API_BASE_URL } from '../../constants/api';

// Call this function with the default instance of axios when in development
export default function initializeMockAPI(client, delay=500) {
  const mock = new MockAdapter(client, { delayResponse: delay });
  
  // Mock endpoints
  mock.onGet(`${API_BASE_URL}/user/current`).reply(200, currentUser());
  mock.onGet(`${API_BASE_URL}/tracking`).reply(200, foodIntakeTracking());

  return mock;
}