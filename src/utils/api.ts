import { META_CONFIG } from '../config/meta';

interface RetryOptions {
  maxRetries?: number;
  baseDelay?: number;
}

interface MetaError {
  error?: {
    message: string;
    code?: number;
    type?: string;
    subcode?: number;
  };
}

const isRetryableError = (status: number, error?: MetaError['error']) => {
  return (
    status === 429 || // Rate limit
    status === 500 || // Internal server error
    status === 503 || // Service unavailable
    error?.type === 'OAuthException' || // Auth issues that might be temporary
    error?.code === 17 || // Rate limit
    error?.subcode === 2446079 // Temporary API error
  );
};

export async function apiFetch<T = any>(
  url: string,
  options: RequestInit = {},
  { maxRetries = 3, baseDelay = 1000 }: RetryOptions = {}
): Promise<T> {
  let lastError;
  
  // Add app_id to URL if not present
  const urlObj = new URL(url);
  if (!urlObj.searchParams.has('app_id')) {
    urlObj.searchParams.append('app_id', META_CONFIG.appId);
  }
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(urlObj.toString(), {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        }
      });
      
      const data: MetaError & T = await response.json();
      
      if (!response.ok) {
        const error = {
          message: data.error?.message || `HTTP Error: ${response.status}`,
          status: response.status,
          ...data.error
        };
        
        if (isRetryableError(response.status, data.error) && attempt < maxRetries - 1) {
          const delay = baseDelay * Math.pow(2, attempt);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
        
        throw new Error(error.message);
      }
      
      return data;
    } catch (error) {
      lastError = error;
      
      if (attempt < maxRetries - 1) {
        const delay = baseDelay * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      throw error;
    }
  }
  
  throw lastError;
}

// Re-export fetchWithRetry as it's used in some files
export const fetchWithRetry = apiFetch;