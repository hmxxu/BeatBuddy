import { savePlaylistToSpotify } from "../beatbuddy/src/APIFunctions/saveToSpotify";
import { authorizeWithSpotify } from "../beatbuddy/src/spotify/spotifyAuth";
import { getAccessTokenFromCookie } from "../beatbuddy/src/spotify/tokenCookies";
import { SearchResult } from "../utils";

export async function createSpotifyPlaylist(playlistName: string, currPlaylist:SearchResult[]) {
  console.log("creating playlist.. ");

  const accessToken = getAccessTokenFromCookie();

  if (!accessToken) {
    // User is not authorized, redirect to authorize
    console.log("invalid token -> redirect to authorize..");
    // authorizeWithSpotify();
    return;
  }

  console.log("access token is valid -> creating playlist...");
  // generatePlaylistName();
  await savePlaylistToSpotify(playlistName, currPlaylist);
}