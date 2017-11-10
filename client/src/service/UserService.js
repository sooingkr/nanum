import axios from './config';
import { get, filter } from 'lodash';

// DailyReport
const getDailyReport = async (queryTime) => {
  let trackingData;
  try {
    trackingData = await axios.get(`/users/daily-report`, {
      params: {
        queryTime,
      }
    });
  } catch(error) {
    throw new Error(`UserService error - <getDailyReport()>: ${error}`);
  }
  
  console.log(trackingData);
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

export default {
  getDailyReport,
}

function mealFilter(mealTime) {
  return function(intake) {
    return intake.meal === mealTime;
  }
}