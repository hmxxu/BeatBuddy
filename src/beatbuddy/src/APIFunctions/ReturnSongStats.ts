import { getAccessToken } from "../recommendation/APIWrapper";
//import { getSpotifyClient } from '../spotify/spotifyAuth';
import { SearchResult } from "../../../utils";

/**
 * @param track_uri the URI of the song that we are returning the stats of
 * @returns a json of the songs stats
 */
async function returnSongStats(track_uri: string) : Promise<SpotifyApi.SingleTrackResponse> {
    const { access_token } = await getAccessToken();
    const response = await fetch('https://api.spotify.com/v1/tracks/' + track_uri, {
        method: 'GET',
        headers: { Authorization: `Bearer ${access_token}`,}
    });
    
    return await response.json();
}

export { returnSongStats }

/**
 * @returns a json of all genres used by Spotify
 */
async function returnGenres() : Promise<SpotifyApi.AvailableGenreSeedsResponse> {
    const { access_token } = await getAccessToken();
    const response = await fetch('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
        method: 'GET',
        headers: { Authorization: `Bearer ${access_token}`,}
    });
    
    return await response.json() as SpotifyApi.AvailableGenreSeedsResponse;
}

export { returnGenres }

/**
 * @param artist_uri the URI of the artist that we are returning the stats of
 * @returns a json of the songs stats
 */
async function returnArtistStats(artist_uri: string): Promise<SpotifyApi.SingleArtistResponse> {
    const { access_token } = await getAccessToken();
    const response = await fetch('https://api.spotify.com/v1/artists/' + artist_uri, {
        method: 'GET',
        headers: { Authorization: `Bearer ${access_token}`,}
    });
    
    return await response.json();
}

export { returnArtistStats }

/**
 * @param id the ID of the spotify artist that we want recs from
 * @returns a json of the 10 songs that Spotify recs
 */
async function returnDummyRec(id: string): Promise<SpotifyApi.RecommendationsFromSeedsResponse> {
    const { access_token } = await getAccessToken();
    const response = await fetch('https://api.spotify.com/v1/recommendations/?seed_artists=' + id + '&limit=10', {
        method: 'GET',
        headers: { Authorization: `Bearer ${access_token}`,}
    });
    
    return await response.json();
}

export { returnDummyRec }

/**
 * @param limit the targeted number of songs returned (0-100)
 * @param seed_artists a list of artist the recs will use (0-5)
 * @param seed_genres a list of genres the recs will use (0-5)
 * @param seed_tracks a list of tracks (URI) the recs will use (0-5)
 * @param target_acousticness number in the range 0.0-0.1 (optional)
 * @param target_danceability number in the range 0.0-0.1 (optional)
 * @param target_energy number in the range 0.0-0.1 (optional)
 * @param target_instrumentalness number in the range 0.0-0.1 (optional)
 * @param target_key number in the range 0.0-0.1 (optional)
 * @param target_liveness number in the range 0.0-0.1 (optional)
 * @param target_loudness number in the range 0.0-0.1 (optional)
 * @param target_mode numbers that are integers (optional)
 * @param target_speechiness number in the range 0.0-0.1 (optional)
 * @param target_tempo number in the range 0.0-0.1 (optional)
 * @param target_time_signature integers in the range 0-11 (optional)
 * @param target_valence number in the range 0.0-0.1 (optional)
 * @returns a json of tracks Spotify recs based on the parameters
 */
async function returnSpotifyRec(
    limit: number,
    seed_artists: string[],
    seed_genres: string[],
    seed_tracks: string[],
    target_acousticness?: number,
    target_danceability?: number,
    target_energy?: number,
    target_instrumentalness?: number,
    target_key?: number,
    target_liveness?: number,
    target_loudness?: number,
    target_mode?: number,
    target_speechiness?: number,
    target_tempo?: number,
    target_time_signature?: number,
    target_valence?: number
    ): Promise<SpotifyApi.RecommendationsFromSeedsResponse> {
    const { access_token } = await getAccessToken();

    const queryParams = new URLSearchParams({
        limit: limit.toString(),
        seed_artists: seed_artists.join(","),
        seed_genres: seed_genres.join(","),
        seed_tracks: seed_tracks.join(","),
        ...(target_acousticness !== undefined && { target_acousticness: target_acousticness.toString() }),
        ...(target_danceability !== undefined && { target_danceability: target_danceability.toString() }),
        ...(target_energy !== undefined && { target_energy: target_energy.toString() }),
        ...(target_instrumentalness !== undefined && { target_instrumentalness: target_instrumentalness.toString() }),
        ...(target_key !== undefined && { target_key: target_key.toString() }),
        ...(target_liveness !== undefined && { target_liveness: target_liveness.toString() }),
        ...(target_loudness !== undefined && { target_loudness: target_loudness.toString() }),
        ...(target_mode !== undefined && { target_mode: target_mode.toString() }),
        ...(target_speechiness !== undefined && { target_speechiness: target_speechiness.toString() }),
        ...(target_tempo !== undefined && { target_tempo: target_tempo.toString() }),
        ...(target_time_signature !== undefined && { target_time_signature: target_time_signature.toString() }),
        ...(target_valence !== undefined && { target_valence: target_valence.toString() }),
      });
      const url = `https://api.spotify.com/v1/recommendations/?${queryParams}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: { Authorization: `Bearer ${access_token}`, }
    });

    return await response.json();
}

export { returnSpotifyRec }


/**
* @param query the search query from the search bar
* @returns A array of 5 SearchResult with the top 5 tracks given the query
**/
async function searchSpotify(query: string): Promise<SearchResult[]> {
    const { access_token } = await getAccessToken();
    const response = await fetch('https://api.spotify.com/v1/search?type=track&q=' + query + '&limit=5', {
        method: 'GET',
        headers: { Authorization: `Bearer ${access_token}`,}
    });

    const data = await response.json();
    const res: SearchResult[] = [];
    const tracks = data.tracks.items;
    for (let i = 0; i < 5; i++) {
        const genre = await returnSongGenre(tracks[i].artists[0].id);
        res.push(new SearchResult(tracks[i].artists[0].name,
            tracks[i].name, tracks[i].id, genre));
    }

    return res;
}

export { searchSpotify }

/**
 * Given a playlistName, description whether it is isPublic, and a array if song URIs
 * this function will make and save a playlist
 * @param playlistName the name of the playlist
 * @param description the description of the playlist
 * @param isPublic whether the playlist is public
 * @param songs a list of song URIs in the playlist (Each URI must be formatted: "spotify:track:{URI}")
 * */
// async function createPlaylist(playlistName: string, description: string, isPublic: boolean, songs: string[]) {
//     const playlistURI = (await getSpotifyClient().createPlaylist(playlistName, { 'description': description, 'public': isPublic })).body.uri.split(':')[2];
//     getSpotifyClient().addTracksToPlaylist(playlistURI, songs);
// }

// export { createPlaylist };

/**
 * Helper function to get genres from a artist
 * @param artist_uri the uri of the artist
 * @returns a array of genres for the given artist
 * */
async function returnSongGenre(artist_uri: string) : Promise<string[]> {
    const { access_token } = await getAccessToken();
    const response = await fetch('https://api.spotify.com/v1/artists/' + artist_uri, {
        method: 'GET',
        headers: { Authorization: `Bearer ${access_token}`,}
    });
    const data = await response.json();
    return await data.genres;
}

export { returnSongGenre }
