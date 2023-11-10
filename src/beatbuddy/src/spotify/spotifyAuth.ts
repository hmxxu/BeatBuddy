import SpotifyWebApi from 'spotify-web-api-node';
import { saveAccessTokenToCookie, getAccessTokenFromCookie } from './tokenCookies';

const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.REACT_APP_SPOTIFY_REDIRECT_URI_PROD;

const AUTHORIZATION_ENDPOINT = 'https://accounts.spotify.com/authorize';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const SCOPE = 'user-read-private \
               playlist-modify-public \
               playlist-modify-private \
               app-remote-control \
               user-library-modify \
               user-read-playback-state \
               streaming';

/**
 * Redirects the user to the Spotify Accounts service to authorize access
 */
export async function authorizeWithSpotify(): Promise<void> {

  const accessToken = getAccessTokenFromCookie();
  if (accessToken) {
    return;
  }

  // Check if the authorization code is already present in the URL
  const searchParams = new URLSearchParams(window.location.search);
  const code = searchParams.get('code');
  if (code) {
    try {
      const token = await exchangeCodeForAccessToken(code);
      saveAccessTokenToCookie(token);
      return;
    } catch (error) {
      console.error(error);
    }
  }

  // Redirect the user to the Spotify login page
  const queryParams = new URLSearchParams({
    client_id: CLIENT_ID || '',
    response_type: 'code',
    redirect_uri: REDIRECT_URI || '',
    scope: SCOPE,
  });

  const authorizationUrl = `${AUTHORIZATION_ENDPOINT}?${queryParams}`;
  window.location.replace(authorizationUrl);
}

/**
 * Exchanges the authorization code for an access token
 * @param code The authorization code returned by the Spotify Accounts service
 * @returns The access token that can be used to make requests to the Spotify Web API on behalf of the user
 */
export async function exchangeCodeForAccessToken(code: string): Promise<string> {
  const data = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: REDIRECT_URI || "",
    client_id: CLIENT_ID || "",
    client_secret: CLIENT_SECRET || ""
  });

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: data
  });

  const token = (await response.json()).access_token;
  return token;
}


/**
 * Creates a new Spotify client object with the given access token
 * @param accessToken The access token to use for authenticating requests to the Spotify Web API
 * @returns A new Spotify client object
 */
export function createSpotifyClient(accessToken: string): any {
  const spotifyClient = new SpotifyWebApi({
    accessToken,
  });

  return spotifyClient;
}


/**
 * Returns a SpotifyWebApi instance authenticated with the access token stored in a cookie.
 * Authorizes the user if the access token doesn't exist or has expired.
 *
 * @returns SpotifyWebApi an instance authenticated with the access token.
 *
 * @throws Error if there is an error authorizing the user or no access token is found in the cookie.
 */
export async function getSpotifyClient(): Promise<SpotifyWebApi> {
  const token = getAccessTokenFromCookie();

  if (token !== null || token != undefined) {
    // Create the Spotify client using the existing access token
    return createSpotifyClient(token);
  } else {
    // Access token doesn't exist, authorize the user and obtain a new access token
    await authorizeWithSpotify();
    const newToken = getAccessTokenFromCookie();

    if (newToken !== null) {
      // Create the Spotify client using the new access token
      return createSpotifyClient(newToken);
    } else {
      throw new Error('No Spotify access token found');
    }
  }
}

