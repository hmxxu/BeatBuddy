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
import { authorizeWithSpotify } from '../beatbuddy/src/spotify/spotifyAuth';
import { returnSongFeatures } from '../beatbuddy/src/APIFunctions/ReturnSongStats';

function GeneratedPlaylist(props:any) {

  class SearchResult {
    artist: string;
    title: string;
    id: string;
    imgUrl: string;

    constructor(artist: string, title: string, id: string, imgUrl: string) {
        this.artist = artist;
        this.title = title;
        this.id = id;
        this.imgUrl = imgUrl;
    }
  }

  const [currTitle, setCurrTitle] = useState("");
  const [currArtist, setCurrArtist] = useState("");
  const [currImg, setCurrImg] = useState("");
  const [playerViewState, setPlayerViewState] = useState("hidden");

  // temp?
  const [currEnergy, setEnergy] = useState(0);
  const [currAcoustic, setAcoustic] = useState(0);
  const [currDance, setDance] = useState(0);

  /*
  * Updates the selected song when song result is clicked
  * (in song player)
  * @param song - Song array arranged like [artist, song, genre]
  */
  const handleSongClick = async (song : any) => {
    setCurrTitle(song.title);
    setCurrArtist(song.artist);
    setCurrImg(song.imgUrl);

    // get features and display:
    const featuresJSON = await returnSongFeatures(song.id);
    console.log(featuresJSON);

    setEnergy(Math.round(featuresJSON.energy * 100));
    setAcoustic(Math.round(featuresJSON.acousticness * 100));
    setDance(Math.round(featuresJSON.danceability * 100));

    setPlayerViewState("");
  }

  return(
    <section className={ props.viewState }>
      <h2>Your Recommended Playlist</h2>
      <section id="playlist-wrapper">
        <button id="back-btn">
          <img src={arrow_back} alt="A back icon shaped like a bent arrow" className="arrow-back"></img>
          <span className="bold">Try another song</span>
        </button>
        <button id="spotify-btn" onClick={() => authorizeWithSpotify()}>
          <span className="bold">Save to Spotify</span>
          <img src={spotify_icon} className="spotify-icon" alt="Spotify icon"></img>
        </button>
        <section id="song-player" className={playerViewState}>
          <div className="flex">
            <img src={ currImg } alt="The song cover" className="song-img"></img>
            <div className="current-song">
              <span className="h-title bold">{currTitle}</span>
              <span className="h2 bold">By {currArtist}</span>
            </div>
            <div className="play-btn-container">
                <img src={play_btn} className="play-btn" alt="an icon of a play button"></img>
            </div>
          </div>
          <div className="song-stats flex">
            <div id="energy" className="attrs">
              <h3>Energy</h3>
              {/* <h1>90%</h1> */}
              <p className="h-title bold">{currEnergy + "%"}</p>
            </div>
            <div className="vl"></div>
            <div id="accoustic" className="attrs">
              <h3>Accousticness</h3>
              {/* <h1>10%</h1> */}
              <p className="h-title bold">{currAcoustic + "%"}</p>
            </div>
            <div className="vl"></div>
            <div id="danceable" className="attrs">
              <h3>Danceability</h3>
              {/* <h1>13%</h1> */}
              <p className="h-title bold">{currDance + "%"}</p>
            </div>
          </div>
        </section>
        <section className="song-results-container">
          <div className="results-label h4 bold">
            <p></p>
            <p>Artist</p>
            <p>Title</p>
            <p>Genre</p>
          </div>
          <hr></hr>
          {
            props.recArray.map((song : any) => (
              <SongResult onClick={() => {handleSongClick(song)}}
              key={song.artist + song.title}
              src={song.imgUrl}
              artist={song.artist} title={song.title} genre={song.genre}/>
            ))
          }
        </section>
      </section>
      <section id="playlist-wrapper-mobile">
        <button id="back-btn" className="icon-mobile">
          <img src={arrow_back} alt="A back icon shaped like a bent arrow" className="arrow-back-mobile"></img>
          <span className="bold"></span>
        </button>
        <button id="spotify-btn" className="icon-mobile">
          <span className="h5 bold icon-mobile">Save to Spotify</span>
          <img src={spotify_icon} className="spotify-icon" alt="Spotify icon"></img>
        </button>
        <section id="song-player-mobile">
          <div className="flex-mobile">
            <div className="current-song-mobile">
              {/* <h1>{ currTitle }</h1>
              <h2>{ currArtist }</h2> */}
              <span className="h2 bold">{currTitle}</span>
              <span className="h4 bold">{currArtist}</span>
            </div>
            <img src={ currImg } alt="The song cover" className="song-img-mobile"></img>
          </div>
          <div className="song-stats-mobile flex-song">
            <div id="liveliness" className="attrs">
              <h5>Energy</h5>
              <h2>{currEnergy + "%"}</h2>
            </div>
            <div className="vl-mobile"></div>
            <div id="accoustic" className="attrs">
              <h5>Accousticness</h5>
              <h2>{currAcoustic + "%"}</h2>
            </div>
            <div className="vl-mobile"></div>
            <div id="danceable" className="attrs">
              <h5>Danceability</h5>
              <h2>{currDance + "%"}</h2>
            </div>
          </div>
        </section>
        <section className="results-mobile">
          {
            props.recArray.map((song: any) => (
              // * for generated_playlist design, show song-playlist-mobile, hide song-result-mobile
              <SongResult design= "generated_playlist" onClick={() => { handleSongClick(song) }}
              key={song.artist + song.title}
              artist={song.artist} title={song.title} genre={song.genre}/>
            ))
          }
        </section>
      </section>
    </section>
  )
};

export default GeneratedPlaylist;