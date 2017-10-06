import axios from './config';
import { API_BASE_URL } from '../constants/api';

export const searchFood = async (query) => {
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
