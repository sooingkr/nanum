import axios from './config';
import { API_BASE_URL } from '../constants';

const searchFood = async (query) => {
  let results;
  
  try {
    results = await axios.get(`${API_BASE_URL}/foods/search`, {
      params: { query }
    });
  } catch(error) {
    throw new Error(`UserService error - <searchFood()>: ${error}`);
  }

  return { 
    options: results.data.matches 
  };
}

const getFoodIntakeTracking = async (userId) => {
  let intakeTracking;
  
  try {
    intakeTracking = await axios.get(`${API_BASE_URL}/tracking`, {
      params: { userId }
    });
  } catch(error) {
    throw new Error(`FoodService error - <getFoodIntakeTracking()>: ${error}`);
  }

  return {
    calories: intakeTracking.data.foodIntakeTracking.calories,
    breakfast: intakeTracking.data.foodIntakeTracking.when.breakfast,
    lunch: intakeTracking.data.foodIntakeTracking.when.lunch,
    dinner: intakeTracking.data.foodIntakeTracking.when.dinner,
  };
}

const getFoodSuggestions = async (userId) => {
  let result;

  try {
    result = await axios.get(`${API_BASE_URL}/foods/suggest`, {
      params: { userId }
    });
  } catch(error) {
    throw new Error(`FoodService error - <getFoodSuggestions()>: ${error}`);
  }

  return {
    ...result.data.foodSuggestions
  }
}

export default {
  searchFood,
  getFoodIntakeTracking,
  getFoodSuggestions,
}