// lib/api.js
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_TIMEOUT = process.env.NEXT_PUBLIC_API_TIMEOUT || 10000;

export async function fetchAPI(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    
    throw error;
  }
}

export async function get(endpoint, options = {}) {
  return fetchAPI(endpoint, {
    method: 'GET',
    ...options,
  });
}