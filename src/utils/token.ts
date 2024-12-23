// Utility functions for token handling
export function validateToken(token: string): string {
  if (!token) {
    throw new Error('Meta Ads access token is missing. Please check your environment variables.');
  }
  
  // Meta access tokens start with EAA
  if (!token.startsWith('EAA')) {
    throw new Error('Invalid Meta Ads access token format. Token should start with "EAA".');
  }
  
  if (token.length < 50) {
    throw new Error('Invalid Meta Ads access token length. Please check your token.');
  }
  
  return token.trim();
}