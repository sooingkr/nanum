import axios from './config';
import jwtDecode from 'jwt-decode';
import { saveAuth } from '../utils/auth';
import { API_BASE_PATH } from '../constants';

const decodeUserToken = token => {
  return jwtDecode(token);
};

const loginUser = async (email, password) => {
  let token;
  let decodedToken;
  const formLogin = new FormData();
  formLogin.append('username', email);
  formLogin.append('password', password);

  try {
    token = await axios.post(`${API_BASE_PATH}/post-login`, formLogin);
    decodedToken = decodeUserToken(token.data);

    // Save auth to localstorage
    saveAuth(decodedToken.id, token.data);
  } catch(error) {
    throw new Error(`UserService error - <loginUser()>: ${error}`);
  }
  
  // decode jwt
  return decodeUserToken(token.data);
};

const checkValidToken = async (token) => {
  let isValid;
  
  try {
    isValid = await axios.post(`${API_BASE_PATH}/check-valid-authorization-token`, {
      headers: {
        'Authorization': token,
      }
    });
  } catch(error) {
    throw new Error(`UserService error - <checkValidToken()>: ${error}`);
  }

  return isValid.data;
};

const getTrackingData = async (userId, queryTime) => {
  // const foodIntakeTracking = await FoodService.getFoodIntakeTracking(userId);
  // const foodSuggestions = await FoodService.getFoodSuggestions(userId);
  let trackingData;
  try {
    trackingData = await axios.get(`${API_BASE_PATH}/tracking`, {
      params: {
        userId,
        queryTime,
      }
    });
  } catch(error) {
    throw new Error(`UserService error - <getTrackingData()>: ${error}`);
  }

  return { ...trackingData.data };
}

export default {
  getTrackingData,
  loginUser,
  checkValidToken,
  decodeUserToken,
}