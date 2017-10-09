import axios from './config';
import { API_BASE_URL } from '../constants/api';

const getCurrentUser = async () => {
  let currentUser;

  try {
    currentUser = await axios.get(`${API_BASE_URL}/user/current`);
  } catch(error) {
    throw new Error(`UserService error - <getCurrentUser()>: ${error}`);
  }
  return currentUser.data.user;
};

const loginUser = async (username, password) => {
  let token;
  
  try {
    token = await axios.post(`${API_BASE_URL}/login`, null, {
      auth: {
        username,
        password,
      }
    });
  } catch(error) {
    throw new Error(`UserService error - <loginUser()>: ${error}`);
  }


};

const checkValidToken = async (token) => {
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
};

export default {
  getCurrentUser,
  loginUser,
  checkValidToken,
}