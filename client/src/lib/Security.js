import UserService from '../service/UserService';
import { getToken } from '../utils/authToken';

class Security {
  constructor() {
    this.authToken = getToken();
  }

  requireAuth = async () => {
    if(!this.authToken) {
      return false;
    }
    // Check token validity
    const tokenIsValid = await UserService.checkValidToken(this.authToken);
    console.log(tokenIsValid);
    return tokenIsValid;
  }
}

export default new Security();