
const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

/**
 * Stores access_token and refresh_token as cookie
 */
export function saveTokenToCookie(access_token: string, refresh_token: string): void {
  console.log('called saveTokenToCookie');
  if (!access_token || access_token == "undefined" || !refresh_token || refresh_token == "undefined"){
    return;
  }

  // Cookie is set to expire 1 hour because Spotify access token only lasts for 1 hour.
  // const expirationDate = new Date(Date.now() + (60 * 60 * 1000)); // 1 hour from now
  const expirationDate = new Date(Date.now() + (15000)); // 1 hour from now
  // access_token expires every 1 hour.
  const expirationWarningDate = new Date(Date.now() + (5000));
  document.cookie = `spotify_access_token=${access_token}; expires=${expirationDate.toUTCString()}; path=/`;
  document.cookie = `spotify_refresh_token=${refresh_token}; expires=${expirationDate.toUTCString()}; path=/`;
  localStorage.setItem('spotify_token_expiration', expirationWarningDate.toISOString());
}


/**
 * Retrieves the Spotify access token from the browser's cookies.
 */
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

/**
 * Retrieves the Spotify refresh token from the browser's cookies.
 */
export function getRefreshTokenFromCookie(): string | null {
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [name, value] = cookie.split('=');
    if (name === 'spotify_refresh_token' && value && value != "undefined") {
      return value;
    }
  }
  return null;
}

export function refreshTokenIfNeeded() {
  console.log('called refreshTokenIfNeeded');
  const spotifyExpiration = localStorage.getItem('spotify_token_expiration');
  if (spotifyExpiration) {
    const expirationDate = new Date(spotifyExpiration).getTime();
    console.log('expirationDate: ');
    console.log(expirationDate);
    const now = new Date().getTime();
    console.log('now: ');
    console.log(now);

    if (now >= expirationDate) {
      console.log('calling refreshToken');
      refreshToken();
    } else {
      console.log('now < expirationDate');
      const delay = expirationDate.valueOf() - now.valueOf(); // Calculate delay for next refresh
      setTimeout(refreshToken, delay);
    }
  }

}

/**
 * Renews the access_token so users can still be logged on everytime it expires
 */
export async function refreshToken() {
  console.log('called refreshToken');
  let currRefreshToken = getRefreshTokenFromCookie();
  // If refresh token exists
  if (currRefreshToken) {
    const url = "https://accounts.spotify.com/api/token";

    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: currRefreshToken,
        client_id: CLIENT_ID
      })
    }
    const body = await fetch(url, payload);
    const response = await body.json();

    let newAccessToken = response.accessToken;
    let newRefreshToken = response.refreshToken;

    console.log('SAVING NEW ACCESS AND REFRESH TOKENS');
    saveTokenToCookie(newAccessToken, newRefreshToken);
  }
  return;
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

// If cookie is expired, call refreshToken and set new access_token, refresh_token
window.addEventListener("onload", () => {
  console.log('onload');
})

