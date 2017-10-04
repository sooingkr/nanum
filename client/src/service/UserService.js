import axios from './config';
import { API_BASE_URL } from '../constants/api';

export const getCurrentUser = async () => {
  let currentUser;

  try {
    currentUser = await axios.get(`${API_BASE_URL}/user/current`);
  } catch(error) {
    throw new Error(`UserService error - <getCurrentUser()>: ${error}`);
  }
  return currentUser.data.user;
}

export const loginUser = async () => {
  // TODO
}