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

const getUserInfo = async () => {
  let userInfo;
  try {
    userInfo = await axios.get('/users');
  } catch (error) {
    throw new Error(`UserService error - <getDailyReport()>: ${error}`);
  }

  return {
    id: get(userInfo, 'data.id'),
    name: get(userInfo, 'data.memberName'),
    gender: get(userInfo, 'data.memberGender'),
    dupinfo: get(userInfo, 'data.dupinfo'),
  }
}

const getUserDiseases = async () => {
  let response;
  try {
    response = await axios.get('/diseases');
  } catch (error) {
    throw new Error(`UserService error - <getUserDiseases()>: ${error}`);
  }

  return response.data;
}

const getUserInterests = async () => {
  let response;
  try {
    response = await axios.get('/interests');
  } catch (error) {
    throw new Error(`UserService error - <getUserInterests()>: ${error}`);
  }

  return response.data;
}

const getUserSettings = async () => {
  let response;
  try {
    response = await axios.get('/users/info');
  } catch (error) {
    throw new Error(`UserService error - <getUserSettings()>: ${error}`);
  }

  return response.data;
}

export default {
  getDailyReport,
  getUserInfo,
  getUserDiseases,
  getUserInterests,
  getUserSettings,
}

function mealFilter(mealTime) {
  return function(intake) {
    return intake.meal === mealTime;
  }
}