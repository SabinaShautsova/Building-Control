import axios from 'axios';

const BASE_URL = 'http://localhost:5001';

// Fetch all buildings
export const fetchBuildings = async () => {
  const response = await axios.get(`${BASE_URL}/buildings`);
  return response.data;
};

// Fetch building by ID
export const fetchBuildingById = async (id) => {
  const response = await axios.get(`${BASE_URL}/buildings/${id}`);
  return response.data;
};

// Create a new building
export const createBuilding = async (buildingData) => {
  const response = await axios.post(`${BASE_URL}/buildings`, buildingData);
  return response.data;
};

// Update an existing building
export const updateBuilding = async (id, buildingData) => {
  const response = await axios.put(`${BASE_URL}/buildings/${id}`, buildingData);
  return response.data;
};

// Delete a building by ID
export const deleteBuilding = async (id) => {
  const response = await axios.delete(`${BASE_URL}/buildings/${id}`);
  return response.data;
};
