// Read .env manually if not in web build
if (process.env.REACT_APP_STAGE !== 'production') {
    // require('dotenv').config();
}

/**
 * Get an access token instance from SpotifyAPI. Requires .env in
 * same dir with `SPOTIFY_CLIENT_ID` and `SPOTIFY_SECRET_ID` set.
 * @returns the access token, its type, and expiry time
 */
async function getAccessToken(): Promise<AccessTokenResponse> {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: new URLSearchParams({
            'grant_type': 'client_credentials',
            'client_id': process.env.REACT_APP_SPOTIFY_CLIENT_ID || "",
            'client_secret': process.env.REACT_APP_SPOTIFY_CLIENT_SECRET || ""
        })
    });

    const res = await response.json() as AccessTokenResponse;
    return res;
}

/**
 * Stores the data acquired from an access token request.
 */
interface AccessTokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
}

export { getAccessToken, AccessTokenResponse }