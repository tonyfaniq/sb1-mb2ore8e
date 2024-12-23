// Base fetch utility for API calls
export async function apiFetch(url: string, options: RequestInit = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      // Ensure we're using GET method
      method: 'GET',
      // Don't send any default headers that might interfere
      headers: {
        ...options.headers
      }
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: data.error,
      });
      throw new Error(data.error?.message || `API Error: ${response.statusText}`);
    }
    
    return data;
  } catch (error) {
    console.error('Request failed:', error);
    throw error;
  }
}