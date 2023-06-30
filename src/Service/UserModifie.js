import axios from 'axios';

const API_URL ='http://localhost:8080/authentication-management';

async function modifier(username, nom, password, authority) {
  try {
    const response = await axios.put(`${API_URL}/users/${username}`, {
      nom,
      password,
      authority
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { modifier };
