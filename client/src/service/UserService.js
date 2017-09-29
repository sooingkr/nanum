import {server} from '../config/server';

const apiPath = '/api/user';

export const userService = {
  getUserById: userId => server.get(`${apiPath}/${userId}`),
  getCurrentUser: () => server.get(`${apiPath}/1`), /* TODO fix get current user from login store */
};
