import {server} from '../config/server';

const apiPath = 'user';

export const userService = {
  getUserById: userId => server.get(`${apiPath}/${userId}`)
};
