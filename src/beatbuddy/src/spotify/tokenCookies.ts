export function saveAccessTokenToCookie(token: string): void {
  const expirationDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now
  document.cookie = `spotify_access_token=${token}; expires=${expirationDate.toUTCString()}; path=/`;
}

export function getAccessTokenFromCookie(): string | null {
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [name, value] = cookie.split('=');
    if (name === 'spotify_access_token') {
      return value;
    }
  }
  return null;
}