// services/locationService.js
import { get } from '../lib/api';

export async function getAllLocations(page = 1) {
  try {
    const data = await get(`/location?page=${page}`);
    return data;
  } catch (error) {
    console.error('Error fetching locations:', error);
    throw error;
  }
}

export async function getLocationById(id) {
  try {
    const data = await get(`/location/${id}`);
    return data;
  } catch (error) {
    console.error(`Error fetching location ${id}:`, error);
    throw error;
  }
}