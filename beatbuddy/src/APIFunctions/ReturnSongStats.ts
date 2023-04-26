require('dotenv').config({path: __dirname + '/.env'})
import { getAccessToken } from "../recommendation/APIWrapper";

/**
 * @param id the ID of the song that we are returning the stats of
 * @returns a json of the songs stats
 */
async function returnSongStats(id: string) {
    const { access_token } = await getAccessToken();
    const response = await fetch('https://api.spotify.com/v1/tracks/' + id, {
        method: 'GET',
        headers: { Authorization: `Bearer ${access_token}`,}
    });
    
    return await response.json();
}

export { returnSongStats}

/**
 * @param id the ID of the spotify artist that we want recs from
 * @returns a json of the 10 songs that Spotify recs
 */
async function ReturnDummyRec(id: string) {
    const { access_token } = await getAccessToken();
    const response = await fetch('https://api.spotify.com/v1/recommendations/?seed_artists=' + id + '&limit=10', {
        method: 'GET',
        headers: { Authorization: `Bearer ${access_token}`,}
    });
    
    return await response.json();
}

export { ReturnDummyRec}
