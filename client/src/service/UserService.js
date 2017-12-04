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
      // type: get(trackingData, 'diseaseMessageType', 'INFO'),
      type: trackingData.diseaseMessageType || 'INFO',
      message: get(trackingData, 'diseaseMessage', ''),
    },
    breakfast: filter(foodIntakes, mealFilter('BREAKFAST')),
    lunch: filter(foodIntakes, mealFilter('LUNCH')),
    dinner: filter(foodIntakes, mealFilter('DINNER')),
    caloriesTarget: get(trackingData, 'caloriesTarget', null),
    foodSuggestions: get(trackingData, 'foodInfoSuggestions', ''),
    reason: get(trackingData, 'reasonSuggest', ''),
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

export default {
  getDailyReport,
  getAvailableDiseases,
  getAvailableInterests,
  getUserSettings,
  createUserSettings,
  updateUserSettings,
}

function mealFilter(mealTime) {
  return function(intake) {
    return intake.meal === mealTime;
  }
}