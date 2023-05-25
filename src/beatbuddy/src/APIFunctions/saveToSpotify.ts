import { getSpotifyClient } from '../spotify/spotifyAuth';
import { SearchResult } from '../../../utils';
import SpotifyWebApi from 'spotify-web-api-node';

export async function savePlaylistToSpotify(playlistName: string, searchResults: SearchResult[]): Promise<void> {
  console.log("saving to spotify..");

  const spotifyClient: SpotifyWebApi = await getSpotifyClient();

  // Creates a new playlist
  const newPlaylist = await spotifyClient.createPlaylist(playlistName);

  // Adds tracks to the playlist
  const trackIds = searchResults.map((result) => result.id);
  await spotifyClient.addTracksToPlaylist(  newPlaylist.body.id, trackIds);

  console.log(`Playlist "${playlistName}" created and saved to Spotify`);
}


