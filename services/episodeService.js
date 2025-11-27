// services/episodeService.js
import { get } from '../lib/api';

export async function getAllEpisodes(page = 1) {
  try {
    const data = await get(`/episode?page=${page}`);
    return data;
  } catch (error) {
    console.error('Error fetching episodes:', error);
    throw error;
  }
}

export async function getEpisodeById(id) {
  try {
    const data = await get(`/episode/${id}`);
    return data;
  } catch (error) {
    console.error(`Error fetching episode ${id}:`, error);
    throw error;
  }
}