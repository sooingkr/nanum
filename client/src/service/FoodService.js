/**
 * Created by yenhua on 11/2/17.
 */
import axios from './config';
import { DEFAULT_PAGE_SIZE } from '../constants';

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
  return response;
}

const suggestFood = async (name) => {
  let result = await searchFood(name);
  let foodList = result.data.content || [];
  if (foodList && foodList.length > 0) {
    foodList = foodList.map((suggestion) => {
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
  return { options: foodList };
}

const foodDetail = async (foodId) => {
  let result;
  try {
    result = await axios.get(`/foods/details/${foodId}`);
  } catch(error) {
    throw new Error(`FoodService error - <foodDetail()>: ${error}`);
  }

  return result;
}

const removeFoods = async (foodsToRemove) => {
  let response;
  try {
    response = await axios.request({
      url: `/foods/intakes`, 
      method: 'delete',
      data: foodsToRemove,
    });
  } catch (error) {
    throw new Error(`FoodService error - <removeFood()>: ${error}`);
  }

  return response;
};

const addFoodIntake = async (foodsToAdd) => {
  let response;
  try {
    response = await axios.post('/foods/intakes', foodsToAdd);
  } catch (error) {
    throw new Error(`UserService error - <addFoodIntake()>: ${error}`);
  }

  return response;
}

export default {
  searchFood,
  suggestFood,
  foodDetail,
  removeFoods,
  addFoodIntake,
}