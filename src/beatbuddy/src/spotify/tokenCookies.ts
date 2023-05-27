export function saveAccessTokenToCookie(token: string): void {

  console.log("Saving token...");
  if (!token || token == "undefined"){
    console.log("attempted to save null or undef. token: " + token);
    return;
  }

  const expirationDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now
  document.cookie = `spotify_access_token=${token}; expires=${expirationDate.toUTCString()}; path=/`;
}

export function getAccessTokenFromCookie(): string | null {
  console.log("retrieving token...");

  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [name, value] = cookie.split('=');
    if (name === 'spotify_access_token' && value && value != "undefined") {
      return value;
    }
  }

  console.log("retrived token is null");
  return null;
}



