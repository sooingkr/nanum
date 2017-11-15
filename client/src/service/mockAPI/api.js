import MockAdapter from 'axios-mock-adapter';
import {
  tracking,
  searchFood,
  suggestFood,
  foodDetail,
  removeFood,
} from './responses';

// Call this function with the default instance of axios when in development
export default function initializeMockAPI(client, delay=500) {
  const mock = new MockAdapter(client, { delayResponse: delay });

  // Mock endpoints
  mock.onGet(`/users/daily-report`).reply(200, tracking);
  mock.onGet(`/foods/search`).reply(200, searchFood);
  mock.onGet(`/foods/suggest`).reply(200, suggestFood);
  mock.onGet(`/product`).reply(200, foodDetail);
  mock.onPost(`/foods/intake/delete`).reply(200, removeFood);
  return mock;
}