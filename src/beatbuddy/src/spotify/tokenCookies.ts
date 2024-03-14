
export function saveAccessTokenToCookie(access_token: string, refresh_token: string): void {
  if (!access_token || access_token== "undefined" || !refresh_token || refresh_token== "undefined"){
    return;
  }

  // Cookie is set to expire 1 hour because Spotify access token only lasts for 1 hour.
  const expirationDate = new Date(Date.now() + (60 * 60 * 1000)); // 1 hour from now
  document.cookie = `spotify_access_token=${access_token}; expires=${expirationDate.toUTCString()}; path=/`;
  document.cookie = `spotify_refresh_token=${refresh_token}; expires=${expirationDate.toUTCString()}; path=/`;
}

export function getAccessTokenFromCookie(): string | null {
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [name, value] = cookie.split('=');
    if (name === 'spotify_access_token' && value && value != "undefined") {
      return value;
    }
  }

  return null;
}

export async function clearToken() {
  let access_token_cookie = 'spotify_access_token';
  let refresh_token_cookie = 'spotify_refresh_token';
  try {
    // Makes the cookie expire, clearing it
    document.cookie = access_token_cookie + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = refresh_token_cookie + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
  } catch (error) {
    console.log('An Error has occurred. Access Token Cookie cannot be removed.')
    console.log(error);
  }
}

// If cookie is expired,


