import React from 'react';
import { returnDummyRec, returnSpotifyRec } from '../beatbuddy/src/APIFunctions/ReturnSongStats';

function PlaylistReady() {

  async function generateRec() {
    let limit: number = 20;
    let artists_seed: string[] = ['0PHf0oiic0xAnCrRuLTtHl'];
    let genres_seed: string[] = ['j-pop'];
    let tracks_seed: string[] = ['69aL4LJK092UFLmWtFeFFy'];

    let spotify_artist_id = '0PHf0oiic0xAnCrRuLTtHl';
    let data = await returnDummyRec(spotify_artist_id);
    console.log(data);
  }
  // function generateRec(){console.log('h');}

  return(
    <div>
        <h2>That's it! Your playlist is now ready.</h2>
        <button id="generate-playlist-btn" onClick={generateRec}>Generate my playlist</button>
    </div>
  )
};

export default PlaylistReady;