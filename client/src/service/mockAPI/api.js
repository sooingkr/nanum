import MockAdapter from 'axios-mock-adapter';
import {
  tracking,
  searchFood,
  suggestFood,
  login,
  checkValidToken,
  foodDetail,
  alternativeFoodDetails,
} from './responses';
import { API_BASE_PATH } from '../../constants';

//Add json to mock server API

const endpoints = {
  getReport: `${API_BASE_PATH}/users/daily-report`,
  searchFood: `${API_BASE_PATH}/foods/search`,
  suggestFood: `${API_BASE_PATH}/foods/suggest`,
  foodDetailUrl: new RegExp(`^(${API_BASE_PATH}/products/)`, 'i'),
  alternativeFood: `${API_BASE_PATH}/products/alternativeFood`,
  login: `${API_BASE_PATH}/post-login`,
  checkValidToken: `${API_BASE_PATH}/check-valid-authorization-token`
}

// Call this function with the default instance of axios when in development
export default function initializeMockAPI(client, delay = 500) {

  const mock = new MockAdapter(client, { delayResponse: delay });

  // Mock endpoints
  mock.onGet(endpoints.getReport).reply(200, tracking);
  mock.onGet(endpoints.searchFood).reply(200, searchFood);
  mock.onGet(endpoints.suggestFood).reply(200, suggestFood);
  mock.onGet(endpoints.foodDetailUrl).reply(config => {

    // get foodId from url
    const foodId = /\d+/.exec(config.url)[0];

    // return foodDetail with the given id
    return [200, foodDetail.find(f => f.id == foodId)];
  });
  mock.onGet(endpoints.alternativeFood).reply(200, alternativeFoodDetails);
  mock.onPost(endpoints.login).reply(200, login);
  mock.onPost(endpoints.checkValidToken).reply(200, checkValidToken);
  return mock;
}