import axios from './config';
import { API_BASE_PATH } from '../constants';

const searchFood = async (query, page=0, size=20, sort='createTime,asc') => {
  let response;
  
  try {
    response = await axios.get(`${API_BASE_PATH}/foods/search`, {
      params: { 
        query,
        page,
        size,
        sort,
      }
    });
  } catch(error) {
    throw new Error(`UserService error - <searchFood()>: ${error}`);
  }

  return response.data.results;
}

const suggestFood = async (query) => {
  let results;
  
  try {
    results = await axios.get(`${API_BASE_PATH}/foods/suggest`, {
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
  suggestFood,
}