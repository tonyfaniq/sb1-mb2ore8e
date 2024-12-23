import type { MetaResponse } from '../types/meta';

export async function apiFetch<T>(url: string, options: RequestInit = {}): Promise<MetaResponse<T>> {
  try {
    const response = await fetch(url, {
      ...options,
      method: 'GET',
      headers: {
        ...options.headers
      }
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || `API Error: ${response.statusText}`);
    }
    
    return data;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new Error(`API request failed: ${message}`);
  }
}