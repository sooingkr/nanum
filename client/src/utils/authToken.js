export function saveToken(token) {
  window.localStorage.setItem('Authorization', token);
}

export function getToken() {
  let token;
  
  try {
    token = window.localStorage.getItem('Authorization');
  } catch(error) {
    console.error("Error getting Token from localStorage in <getToken()> " + error);
  }
  
  return token;
}