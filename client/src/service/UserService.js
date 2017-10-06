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

export const checkValidToken = async (token) => {
  let isValid;

  try {
    isValid = await axios.post(`${API_BASE_URL}/check-valid-authorization-token`, {
      headers: {
        'Authorization': token,
      }
    });
  } catch(error) {
    throw new Error(`UserService error - <checkValidToken()>: ${error}`);
  }

  return isValid.data;
}