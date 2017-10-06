export const saveToken = (token) => {
  localStorage.setItem('Authorization', token);
}

export const getToken = () => {
  let token;

  try {
    token = localStorage.getItem('Authorization');
  } catch(error) {
    console.error("Error getting Token from localStorage in <getToken()> " + error);
  }
  
  return token;
}