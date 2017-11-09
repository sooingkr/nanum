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

  return response.data;
}

const suggestFood = async (query) => {
  let results;
  
  try {
    results = await axios.get(`${API_BASE_PATH}/foods/suggest`, {
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

const removeFoods = async (foods) => {
  let result;

  try {
    result = await axios.post(`${API_BASE_PATH}/foods/intake/delete`, {
      data: { foods }
    });
  } catch (error) {
    throw new Error(`FoodService error - <removeFood()>: ${error}`);
  }

  return result.data;
};

const getFoodDetail = async (id) => {
  let result;

  try {
    result = await axios.get(`${API_BASE_PATH}/foods/details/${id}`);
  } catch (error) {
    throw new Error(`FoodService error - <getFoodDetail()>: ${error}`);
  }

  return result.data;
};

export default {
  searchFood,
  suggestFood,
  foodDetail,
  removeFoods,
  getFoodDetail
}