import React, { useState } from 'react';

// temp
import minami from './../images/minami.jpg';

import '../styles/generatedPlaylist.css';
import '../styles/songSearch.css';
import SongResult from './SongResult';


function GeneratedPlaylist() {

  // temp
  const [currSongsState, setSongsState] = useState([
    ["minami", "Eternal Blue", "J-pop"], 
    ["deco*27", "vampire", "Vocaloid"],
    ["Ryo", "melt", "Vocaloid"]
  ]);  

  const [currTitle, setCurrTitle] = useState(currSongsState[0][1]);
  const [currArtist, setCurrArtist] = useState(currSongsState[0][0]);

  /*
  * Updates the selected song when song result is clicked
  * (in song player)
  * @param song - Song array arranged like [artist, song, genre]
  */
  const handleSongClick = (song : any) => {
    setCurrTitle(song[1]);
    setCurrArtist(song[0]);
  }

  return(
    <section>
      <h2>Your Recommended Playlist</h2>
      <section id="playlist-wrapper">
        <button id="back-btn">
          <span className="material-symbols-rounded">
            arrow_back
          </span>
          Try another song</button>
        <button id="spotify-btn">Import playlist to Spotify</button>
        <section id="song-player">
          <div className="flex">
            <img src={ minami }></img>
            <div>
              <h3>{ currTitle }</h3>
              <h2>{ currArtist }</h2>
            </div>
            <button>
              <span className="material-symbols-rounded">
                  play_circle
              </span>
            </button>
          </div>
        </section>
        <section className="song-results-container">
          <div>
            <p></p>
            <p>Artist</p>
            <p>Title</p>
            <p>Genre</p>
          </div>
          <hr></hr>
          {
            currSongsState.map((song : any) => (
              <SongResult onClick={() => {handleSongClick(song)}}
              key={song[0] + song[1]}
              artist={song[0]} title={song[1]} genre={song[2]}/>
            ))
          }
        </section>
      </section>
    </section>
  )
};

export default GeneratedPlaylist;