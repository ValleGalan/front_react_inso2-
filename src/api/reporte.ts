import { BASE_API } from "../utils/constants";

export async function getAllReportsApi() {//token
  try {
    const url = `${BASE_API}/reporte/Allreports`;
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

export async function addReportApi(data) { //token
  try {
    const url = `${BASE_API}/reporte`;
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

export async function updateReportApi(id, data) { //token
  try {
    const url = `${BASE_API}/reporte/${id}`;
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

export async function deleteReportApi(id) {//token
  try {
    const url = `${BASE_API}/reporte/${id}`;
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

export async function getDomiciliosHechosEsclarecidosApi() {//token
  try {
    const url = `${BASE_API}/reporte/domiciliosHechosEsclarecidos`;
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
