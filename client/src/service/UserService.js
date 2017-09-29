import axios from 'axios';
import { API_BASE_URL } from '../constants/api';
import initializeMockAPI from './mockAPI/api';

if (process.env.NODE_ENV === 'development' ) {
  initializeMockAPI(axios);
}

if(process.env.NODE_ENV === 'test') {
  // No delay when in test mode
  initializeMockAPI(axios, 0);
}

export const getCurrentUser = async () => {
  let currentUser;

  try {
    currentUser = await axios.get(`${API_BASE_URL}/user/current`);
  } catch(error) {
    throw new Error(`UserService error - <getCurrentUser()>: ${error}`);
  }
  return currentUser.data.user;
}

export const getFoodIntakeTracking = async (userId) => {
  let intakeTracking;
  
  try {
    intakeTracking = await axios.get(`${API_BASE_URL}/tracking`, {
      params: { userId }
    });
  } catch(error) {
    throw new Error(`UserService error - <getFoodIntakeTracking()>: ${error}`);
  }
  return intakeTracking.data.foodIntakeTracking;
}

export const loginUser = async () => {
  // TODO
}