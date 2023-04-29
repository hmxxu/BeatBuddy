import React, { useState } from 'react';

// temp
import minami from '../images/minami.jpg';
import play_btn from '../images/play-btn.png';
import arrow_back from '../images/arrow-back.png';
import spotify_icon from '../images/spotify-icon.png';

import '../styles/generatedPlaylist.css';
import '../styles/songSearch.css';
import SongResult from './SongResult';
import { id, qs } from '../utils';


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
          {/* <span className="material-symbols-rounded">
            arrow_back
          </span> */}
          <img src={arrow_back} alt="A back icon shaped like a bent arrow" className="arrow-back"></img>
          <span className="bold">Try another song</span>
        </button>
        <button id="spotify-btn">
          <span className="bold">Save to Spotify</span>
          <img src={spotify_icon} className="spotify-icon" alt="Spotify icon"></img>
          </button>
        <section id="song-player">
          <div className="flex">
            <img src={ minami } alt="The song cover" className="song-img"></img>
            <div className="current-song">
              {/* <h1>{ currTitle }</h1>
              <h2>{ currArtist }</h2> */}
              <p className="h1 bold">{currTitle}</p>
              <p className="h2 bold">By {currArtist}</p>
            </div>
            <div className="play-btn-container">
                <img src={play_btn} className="play-btn" alt="an icon of a play button"></img>
                {/* {<div className="circle"></div>} */}
                {/* <span className="material-symbols-rounded">
                  play_circle
              </span> */}
            </div>
          </div>
          <div className="song-stats flex">
            <div id="liveliness" className="attrs">
              <h3>Liveliness</h3>
              <h1>90%</h1>
            </div>
            <div className="vl"></div>
            <div id="accoustic" className="attrs">
              <h3>Accousticness</h3>
              <h1>10%</h1>
            </div>
            <div className="vl"></div>
            <div id="danceable" className="attrs">
              <h3>Danceability</h3>
              <h1>13%</h1>
            </div>
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