import axios from 'axios';

const BASE_URL = 'http://localhost:5001';

export const fetchBuildings = async () => {
  const response = await axios.get(`${BASE_URL}/buildings`);
  return response.data;
};

export const fetchBuildingById = async (id) => {
  const response = await axios.get(`${BASE_URL}/buildings/${id}`);
  return response.data;
};

export const createBuilding = async (buildingData) => {
  const response = await axios.post(`${BASE_URL}/buildings`, buildingData);
  return response.data;
};

export const updateBuilding = async (id, buildingData) => {
  const response = await axios.put(`${BASE_URL}/buildings/${id}`, buildingData);
  return response.data;
};

export const deleteBuilding = async (id) => {
  const response = await axios.delete(`${BASE_URL}/buildings/${id}`);
  return response.data;
};

export const updateBuildingTemperature = async (id, temperature) => {
  const response = await axios.patch(`${BASE_URL}/buildings/${id}/temperature`, { currentTemperature: temperature });
  return response.data;
};
