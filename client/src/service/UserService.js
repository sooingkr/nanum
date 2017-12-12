import axios from './config';
import { get, filter } from 'lodash';

// DailyReport
const getDailyReport = async (queryTime) => {
  let response;
  try {
    response = await axios.get('/users/daily-report', {
      params: {
        queryTime,
      }
    });
  } catch(error) {
    throw new Error(`UserService error - <getDailyReport()>: ${error}`);
  }

  const trackingData = response.data || {};
  const foodIntakes = get(trackingData, 'foodIntakes', []);
  return {
    alert: {
      type: trackingData.diseaseMessageType || 'INFO',
      message: get(trackingData, 'diseaseMessage', ''),
    },
    breakfast: filter(foodIntakes, mealFilter('BREAKFAST')),
    lunch: filter(foodIntakes, mealFilter('LUNCH')),
    dinner: filter(foodIntakes, mealFilter('DINNER')),
    caloriesTarget: get(trackingData, 'caloriesTarget', null),
    foodSuggestions: get(trackingData, 'foodInfoSuggestions', ''),
    reason: get(trackingData, 'reasonSuggest', ''),
    proteinTarget: parseInt((trackingData.proteinTarget || 0), 10),
    sodiumTarget: parseInt((trackingData.sodiumTarget || 0), 10),
    calciumTarget: parseInt((trackingData.calciumTarget || 0), 10),
    celluloseTarget: parseInt((trackingData.celluloseTarget || 0), 10),
    potassiumTarget: parseInt((trackingData.potassiumTarget || 0), 10),
  };
}

const getAvailableDiseases = async () => {
  let response;
  try {
    response = await axios.get('/diseases');
  } catch (error) {
    throw new Error(`UserService error - <getAvailableDiseases()>: ${error}`);
  }

  return response;
}

const getAvailableAllergies = async () => {
  let response;
  try {
    response = await axios.get('/allergies');
  } catch (error) {
    throw new Error(`UserService error - <getAvailableAllergies()>: ${error}`);
  }

  return response;
}

const getAvailableInterests = async () => {
  let response;
  try {
    response = await axios.get('/interests');
  } catch (error) {
    throw new Error(`UserService error - <getAvailableInterests()>: ${error}`);
  }

  return response;
}

const getUserSettings = async () => {
  let response = {};
  try {
    response = await axios.get('/users/info');
  } catch (error) {
    return error;
  }
  return response;
}

const createUserSettings = async (userSettings) => {
  let response;
  try {
    response = await axios.post('/users/info', userSettings);
  } catch (error) {
    throw new Error(`UserService error - <createUserSettings()>: ${error}`);
  }

  if (response.status !== 200) {
    response.data = {};
  }
  return response;
}

const updateUserSettings = async (userSettings) => {
  let response;
  try {
    response = await axios.put('/users/info', userSettings);
  } catch (error) {
    throw new Error(`UserService error - <createUserSettings()>: ${error}`);
  }

  if (response.status !== 200) {
    response.data = {};
  }

  return response;
}

const getNutritionLog = async (queryTime) => {
  let response;
  try {
    response = await axios.get('/users/nutrients', {
      params: {
        queryTime
      }
    });
  } catch (error) {
    throw new Error(`UserService error - <getNutritionLog()>: ${error}`)
  }

  return response;
}

export default {
  getDailyReport,
  getAvailableDiseases,
  getAvailableInterests,
  getAvailableAllergies,
  getUserSettings,
  createUserSettings,
  updateUserSettings,
  getNutritionLog,
}

function mealFilter(mealTime) {
  return function(intake) {
    return intake.meal === mealTime;
  }
}