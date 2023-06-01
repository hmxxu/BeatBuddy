import { getSpotifyClient } from '../spotify/spotifyAuth';
import { SearchResult } from '../../../utils';
import SpotifyWebApi from 'spotify-web-api-node';

export async function savePlaylistToSpotify(playlistName: string, searchResults: SearchResult[]): Promise<void> {

  const spotifyClient: SpotifyWebApi = await getSpotifyClient();

  // Creates a new playlist
  const newPlaylist = await spotifyClient.createPlaylist(playlistName);

  // Adds tracks to the playlist
  const trackIds = searchResults.map((result) => "spotify:track:" + result.id);
  await spotifyClient.addTracksToPlaylist( newPlaylist.body.id, trackIds);

}


