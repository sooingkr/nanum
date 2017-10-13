import axios from './config';
import { API_BASE_PATH } from '../constants';

const searchFood = async (query) => {
  let results;
  
  try {
    results = await axios.get(`${API_BASE_PATH}/foods/search`, {
      params: { query }
    });
  } catch(error) {
    throw new Error(`UserService error - <searchFood()>: ${error}`);
  }

  return { 
    options: results.data.matches 
  };
}

export default {
  searchFood,
}