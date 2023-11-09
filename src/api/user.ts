import { BASE_API } from "../utils/constants";
/* 
export async function loginApi(formValue) {
  try {
    const url = `${BASE_API}/auth/login/`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValue),
    };

    const response = await fetch(url, params);

    if (response.status !== 200) {
      throw new Error("Usuario o contraseña incorrectos");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
*/
export async function getMeApi() {//token
  try {
    const url = `${BASE_API}/auth/me/`;
    const params = {
      headers: {
        //Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getUsersApi() {//token
  try {
    const url = `${BASE_API}/users/Allusers`;
    const params = {
      headers: {
      //  Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function addUserApi(data) { //token
  try {
    const url = `${BASE_API}/users`;
    const params = {
      method: "POST",
      headers: {
       // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function updateUserApi(id, data) { //token
  try {
   // console.log("usuario actualizado", id);
    const url = `${BASE_API}/users/${id}`;
    const params = {
      method: "PUT",
      headers: {
       // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function deleteUserApi(id) {//token
  try {
    const url = `${BASE_API}/users/${id}`;
    const params = {
      method: "DELETE",
      headers: {
     //   Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
