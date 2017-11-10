/**
 * Created by yenhua on 11/2/17.
 */
import axios from './config';

// Get API from Mock Server
const searchFood = async (query, page=0, size=20, sort='createTime,asc') => {
  let response;

  try {
    response = await axios.get(`/foods/search`, {
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
    results = await axios.get(`/foods/suggest`, {
      params: { query }
    });
  } catch(error) {
    throw new Error(`FoodService error - <searchFood()>: ${error}`);
  }
  return {
    options: results.data.matches
  };
}

const foodDetail = async (foodId) => {

  try {
    const result = await axios.get(`/foods/details/${foodId}`).then(res => res.data);
    return result;

  } catch(error) {
    throw new Error(`FoodService error - <foodDetail()>: ${error}`);
  }
}

const removeFoods = async (foods) => {
  let result;

  try {
    result = await axios.post(`/foods/intake/delete`, {
      data: { foods }
    });
  } catch (error) {
    throw new Error(`FoodService error - <removeFood()>: ${error}`);
  }

  return result.data;
};

export default {
  searchFood,
  suggestFood,
  foodDetail,
  removeFoods,
}