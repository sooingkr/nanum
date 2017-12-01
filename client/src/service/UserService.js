import axios from './config';
import { get, filter } from 'lodash';

// DailyReport
const getDailyReport = async (queryTime) => {
  let trackingData;
  try {
    trackingData = await axios.get('/users/daily-report', {
      params: {
        queryTime,
      }
    });
  } catch(error) {
    throw new Error(`UserService error - <getDailyReport()>: ${error}`);
  }
  
  return { 
    alert: {
      type: get(trackingData, 'data.diseaseType'),
      message: get(trackingData, 'data.diseaseMessage'),
    },
    breakfast: filter(trackingData.data.foodIntakes, mealFilter('BREAKFAST')),
    lunch: filter(trackingData.data.foodIntakes, mealFilter('LUNCH')),
    dinner: filter(trackingData.data.foodIntakes, mealFilter('DINNER')),
    caloriesTarget: get( trackingData, 'data.caloriesTarget'),
    foodSuggestions: get(trackingData, 'data.foodInfoSuggestions'),
    reason: get(trackingData, 'data.reasonSuggest'),
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