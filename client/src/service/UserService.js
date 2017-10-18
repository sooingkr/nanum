import axios from './config';
import jwtDecode from 'jwt-decode';
import { saveAuth } from '../utils/auth';
import { API_BASE_PATH } from '../constants';
import {stringify} from 'querystring';

const decodeUserToken = token => {
  return jwtDecode(token);
};

const loginUser = async (email, password) => {
  let token;
  let decodedToken;

  try {
    token = await axios.post(`${API_BASE_PATH}/login`, stringify({username: email, password}));
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
  const isValid = await axios.post(`${API_BASE_PATH}/check-valid-authorization-token`, {
      headers: {
        'Authorization': token,
      }
    });

  return isValid.data;
};

const getTrackingData = async (userId, queryTime) => {
  // const foodIntakeTracking = await FoodService.getFoodIntakeTracking(userId);
  // const foodSuggestions = await FoodService.getFoodSuggestions(userId);
  let trackingData;
  try {
    trackingData = await axios.get(`${API_BASE_PATH}/users/daily-report`, {
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