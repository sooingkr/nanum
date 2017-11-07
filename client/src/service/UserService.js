import axios from './config';
import { API_BASE_PATH } from '../constants';

// DailyReport
const getTrackingData = async (queryTime) => {
  let trackingData;
  try {
    trackingData = await axios.get(`${API_BASE_PATH}/users/daily-report`, {
      params: {
        queryTime,
      }
    });
  } catch(error) {
    throw new Error(`UserService error - <getTrackingData()>: ${error}`);
  }

  return { ...trackingData.data };
}

export default {
  getTrackingData,
}