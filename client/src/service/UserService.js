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

export const getFoodIntakeTracking = async (userId) => {
  let intakeTracking;
  
  try {
    intakeTracking = await axios.get(`${API_BASE_URL}/tracking`, {
      params: { userId }
    });
  } catch(error) {
    throw new Error(`UserService error - <getFoodIntakeTracking()>: ${error}`);
  }

  return {
    calories: intakeTracking.data.foodIntakeTracking.calories,
    breakfast: intakeTracking.data.foodIntakeTracking.when.breakfast,
    lunch: intakeTracking.data.foodIntakeTracking.when.lunch,
    dinner: intakeTracking.data.foodIntakeTracking.when.dinner,
  };
}

export const loginUser = async () => {
  // TODO
}