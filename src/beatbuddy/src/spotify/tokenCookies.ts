export function saveAccessTokenToCookie(token: string): void {
  if (!token || token == "undefined"){
    return;
  }

  // Right now the access token also lasts for 1 day
  const expirationDate = new Date(Date.now() + (60 * 60 * 1000)); // 1 hour from now
  document.cookie = `spotify_access_token=${token}; expires=${expirationDate.toUTCString()}; path=/`;
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

export async function clearAccessToken() {
  let cookieName = 'spotify_access_token';
  try {
    // Makes the cookie expire, clearing it
    document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
  } catch (error) {
    console.log('An Error has occurred. Access Token Cookie cannot be removed.')
    console.log(error);
  }
}



