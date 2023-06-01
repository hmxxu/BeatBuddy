import { savePlaylistToSpotify } from "../beatbuddy/src/APIFunctions/saveToSpotify";
import { authorizeWithSpotify } from "../beatbuddy/src/spotify/spotifyAuth";
import { getAccessTokenFromCookie } from "../beatbuddy/src/spotify/tokenCookies";
import { SearchResult } from "../utils";

export async function createSpotifyPlaylist(playlistName: string, currPlaylist:SearchResult[]) {

  const accessToken = getAccessTokenFromCookie();

  if (!accessToken) {
    // User is not authorized, redirect to authorize
    return;
  }
  await savePlaylistToSpotify(playlistName, currPlaylist);
}