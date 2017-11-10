import axios from './config';

// DailyReport
const getTrackingData = async (queryTime) => {
  let trackingData;
  try {
    trackingData = await axios.get(`/users/daily-report`, {
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