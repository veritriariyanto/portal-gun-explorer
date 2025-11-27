// services/characterService.js
import { get } from '../lib/api';

export async function getAllCharacters(page = 1) {
  try {
    const data = await get(`/character?page=${page}`);
    return data;
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
}

export async function getCharacterById(id) {
  try {
    const data = await get(`/character/${id}`);
    return data;
  } catch (error) {
    console.error(`Error fetching character ${id}:`, error);
    throw error;
  }
}

export async function searchCharacters(name, page = 1) {
  try {
    const data = await get(`/character?name=${name}&page=${page}`);
    return data;
  } catch (error) {
    console.error('Error searching characters:', error);
    throw error;
  }
}

export async function filterCharacters(filters = {}, page = 1) {
  const params = new URLSearchParams({ page, ...filters });
  try {
    const data = await get(`/character?${params.toString()}`);
    return data;
  } catch (error) {
    console.error('Error filtering characters:', error);
    throw error;
  }
}