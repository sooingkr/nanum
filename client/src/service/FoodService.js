/**
 * Created by yenhua on 11/2/17.
 */
import axios from './config';
import { DEFAULT_PAGE_SIZE } from '../constants';

// Get API from Mock Server
const searchFood = async (name, page=0, size=DEFAULT_PAGE_SIZE, sort='createTime,asc') => {
  let response;

  try {
    response = await axios.get(`/foods/search`, {
      params: {
        name,
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

const suggestFood = async (name) => {
  let result = await searchFood(name);
  if (result.content.length > 0) {
    result = result.content.map((suggestion) => {
      return { 
        label: suggestion.name,
        value: { 
          id: suggestion.id,
          name: suggestion.name,
          manufacturer: suggestion.manufacturer,
          imageUrl: suggestion.imageUrl,
          calories: suggestion.calories,
        }
      }
    });
  }
  console.log(result);
  return { options: result };
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