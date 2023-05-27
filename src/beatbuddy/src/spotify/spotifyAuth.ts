import SpotifyWebApi from 'spotify-web-api-node';
import { saveAccessTokenToCookie, getAccessTokenFromCookie } from './tokenCookies';

// Read .env manually if not in web build
if (process.env.REACT_APP_STAGE !== 'production') {
  // require('dotenv');
}

//! temporary, remove these static assignment out when dotenv has been fixed

// TODO: uncomment this when dotenv has been fixed
const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;

const AUTHORIZATION_ENDPOINT = 'https://accounts.spotify.com/authorize';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const SCOPE = "user-read-private user-read-email user-read-playback-state user-modify-playback-state user-read-currently-playing user-library-read user-library-modify playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private user-read-recently-played user-top-read app-remote-control streaming";

/**
 * Redirects the user to the Spotify Accounts service to authorize access
 */
export async function authorizeWithSpotify(): Promise<void> {

  const accessToken = getAccessTokenFromCookie();
  if (accessToken) {
    console.log("user already authorized");
    return;
  }

  // Check if the authorization code is already present in the URL
  const searchParams = new URLSearchParams(window.location.search);
  const code = searchParams.get('code');
  if (code) {
    try {
      const token = await exchangeCodeForAccessToken(code);
      saveAccessTokenToCookie(token);
      console.log("Token saved: ");
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
  console.log("Redirecting to authorization URL:", authorizationUrl);
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
  saveAccessTokenToCookie(token);
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
 * Throws an error if no access token is found in the cookie.
 *
 * @returns SpotifyWebApi an instance authenticated with the access token.
 *
 * @throws Error if no access token is found in the cookie.
 */
export function getSpotifyClient(): SpotifyWebApi {
  const token = getAccessTokenFromCookie();
  if (token !== null) {
    const spotifyClient = createSpotifyClient(token);
    return spotifyClient;
  } else {
    throw new Error('No Spotify access token found');
  }
}
