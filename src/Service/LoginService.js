const API_URL ='http://localhost:8080/authentication-management';

async function loginS(username, password) {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("tedqsttqdvq");
    return { success: false, error: error.message };
  }
}



async function registerS(username, password,tel,nom,prenom,email) {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({id:null, username, password, authority:'CUSTOMER_AUTHORITY' ,firstName:nom,lastName:prenom,phone:tel,email:email  }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
}
async function logout  ()  {
  try {
    // Remove the stored login state
    await localStorage.removeItem('isLoggedIn');
    // Redirect to the Login screen
 
  } catch (error) {
    console.error(error);
  }
};

export { registerS , loginS , logout} ;