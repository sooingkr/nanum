import MockAdapter from 'axios-mock-adapter';
import {
  tracking,
  searchFood,
  suggestFood,
  login,
  checkValidToken,
  foodDetail,
} from './responses';
import { API_BASE_PATH } from '../../constants';

// Call this function with the default instance of axios when in development
export default function initializeMockAPI(client, delay=500) {
  const mock = new MockAdapter(client, { delayResponse: delay });
  
  // Mock endpoints
  mock.onGet(`${API_BASE_PATH}/users/daily-report`).reply(200, tracking);
  mock.onGet(`${API_BASE_PATH}/foods/search`).reply(200, searchFood);
  mock.onGet(`${API_BASE_PATH}/foods/suggest`).reply(200, suggestFood);
  mock.onGet(`${API_BASE_PATH}/product`).reply(200, foodDetail);
  mock.onPost(`${API_BASE_PATH}/post-login`).reply(200, login);
  mock.onPost(`${API_BASE_PATH}/check-valid-authorization-token`).reply(200, checkValidToken);
  return mock;
}