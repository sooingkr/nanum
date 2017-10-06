import axios from './config';
import { API_BASE_URL } from '../constants/api';

export const getCurrentUser = async () => {
  let currentUser;

  try {
    currentUser = await axios.get(`${API_BASE_URL}/user/current`);
  } catch(error) {
    throw new Error(`UserService error - <getCurrentUser()>: ${error}`);
  }
  return currentUser.data.user;
};

export const loginUser = async () => {
  return 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQwMjg4MDlhNWVlYjk1MzYwMTVlZWI5YWQzYjYwMDAxIiwidXNlcm5hbWUiOiJuZ3V5ZW5hbmh2dS5jc0BnbWFpbC5jb20iLCJlbmFibGVkIjp0cnVlLCJleHBpcmUiOm51bGwsImF1dGhvcml0aWVzIjpbeyJhdXRob3JpdHkiOiJST0xFX1VTRVIifV19.UuTiFCFlSnmBhaiKhMunufuR6vm9IO4t1ASdECXnSfg';
};

export const checkValidToken = async (token) => {
  let isValid;

  try {
    isValid = await axios.post(`${API_BASE_URL}/check-valid-authorization-token`, {
      headers: {
        'Authorization': token,
      }
    });
  } catch(error) {
    throw new Error(`UserService error - <checkValidToken()>: ${error}`);
  }

  return isValid.data;
};
