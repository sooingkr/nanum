import axios from './config';
import { API_BASE_PATH } from '../constants';

// Get API from Mock Server
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

  return response.data;
};

const suggestFood = async (query) => {
  let results;

  try {
    results = await axios.get(`${API_BASE_PATH}/foods/suggest`, {
      params: { query }
    });
  } catch(error) {
    throw new Error(`FoodService error - <suggestFood()>: ${error}`);
  }
  return {
    options: results.data.matches 
  };
};

const foodDetail = async ( foodId ) => {
  try {

    return axios.get(`${API_BASE_PATH}/products/${foodId}`).then(res => res.data);
  } catch(error) {
    throw new Error(`FoodService error - <foodDetail()>: ${error}`);
  }
};

const alternativeFood = async => {
  try {
    return axios.get(`${API_BASE_PATH}/products/alternativeFood`).then(res => res.data);
  } catch(error) {
    throw new Error(`FoodService error - <foodAlternativeFood()>: ${error}`);
  }
};

export const foodService = {
  searchFood,
  suggestFood,
  foodDetail,
  alternativeFood
};
