import axios from './config';
import { API_BASE_PATH } from '../constants';

const searchFood = async (query) => {
  let results;
  
  try {
    results = await axios.get(`${API_BASE_PATH}/foods/search`, {
      params: { query }
    });
  } catch(error) {
    throw new Error(`FoodService error - <searchFood()>: ${error}`);
  }
  return {
    options: results.data.matches 
  };
}


const foodDetail = async (foodid) => {
  let result;

  try {
    result = await axios.get(`${API_BASE_PATH}/product/`, {
      params: { foodid }
    });
  } catch(error) {
    throw new Error(`FoodService error - <foodDetail()>: ${error}`);
  }

  return {
    foodDetail: result.data.foodDetail
  };
}

export default {
  searchFood,
  foodDetail
}