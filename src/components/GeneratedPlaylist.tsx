import React, { useState, useEffect } from 'react';
import play_btn from '../images/play-btn.png';
import pause_btn from '../images/pause-btn.png';
import arrow_back from '../images/arrow-back.png';
import spotify_icon from '../images/spotify-icon.png';

import '../styles/generatedPlaylist.css';
import '../styles/songSearch.css';
import SongResult from './SongResult';
import { id, processImage, qs } from '../utils';
import { savePlaylistToSpotify } from '../beatbuddy/src/APIFunctions/saveToSpotify';
import { returnSongFeatures } from '../beatbuddy/src/APIFunctions/ReturnSongStats';
import { SearchResult } from '../utils';
import { playSong, pauseSong, stopSong } from '../beatbuddy/src/spotify/getSong';
import { getAccessTokenFromCookie } from '../beatbuddy/src/spotify/tokenCookies';
import { authorizeWithSpotify } from '../beatbuddy/src/spotify/spotifyAuth';


export function updateProgressBar(audio: any){
  const progressBar = document.getElementById('progress-bar');
  const timeElement = document.getElementById('song-time');

  if (progressBar && timeElement && audio) {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progress}%`;

    const remainingTime = audio.duration - audio.currentTime;
    timeElement.innerText = formatTime(remainingTime);
  }
}

function formatTime(time: number) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${padZero(minutes)}:${padZero(seconds)}`;
}

function padZero(number: number) {
  return number.toString().padStart(2, '0');
}

export function noSongPreviewMsg() {
  const msg = document.getElementById("no-preview-msg");
  if (msg) {
    msg.innerText = "No preview of the song available.";
    msg.style.display = "block";
  }
}

export function removePreviewMsg() {
  const msg = document.getElementById("no-preview-msg");
  if (msg) {
    msg.style.display = "none";
  }
}



function GeneratedPlaylist(props: any) {

  const [currTitle, setCurrTitle] = useState("");
  const [currArtist, setCurrArtist] = useState("");
  const [currImg, setCurrImg] = useState("");
  const [currTrackId, setCurrTrackId] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);


  const [currEnergy, setEnergy] = useState(0);
  const [currAcoustic, setAcoustic] = useState(0);
  const [currDance, setDance] = useState(0);


  /**
   * Upon the recArray change (when new playlist is generated),
   * update the player to display the first song.
   */
  useEffect(() => {
    if (props.recArray.length > 0) {
      handleSongClick(props.recArray[0]);
    }
  }, [props.recArray])


  /*
  * Updates the selected song when song result is clicked
  * (in song player)
  * @param song - Song array arranged like [artist, song, genre]
  */
  const handleSongClick = async (song: any) => {

    stopSong(); // Stop the currently playing song

    setIsPlaying(false); // Reset the isPlaying state to false

    setCurrTitle(song.title);
    setCurrArtist(song.artist);
    setCurrImg(song.imgUrl);
    setCurrTrackId(song.id);

    // get features and display
    const featuresJSON = await returnSongFeatures(song.id);
    setEnergy(Math.round(featuresJSON.energy * 100));
    setAcoustic(Math.round(featuresJSON.acousticness * 100));
    setDance(Math.round(featuresJSON.danceability * 100));

    let songImg = song.imgUrl;
    processImage(songImg);

    // playing preview of songs
    handleSongProgressBar();
    removePreviewMsg();
  };

  function handleSongProgressBar() {
    // Reset the song progress bar and display the play button
    const progressBar = document.getElementById('progress-bar');
    const songTimeElement = document.getElementById('song-time');
    if (progressBar && songTimeElement) {
      progressBar.style.width = '0%';
      progressBar.innerText = '';
      songTimeElement.innerText = "";
    }
  }

  async function createSpotifyPlaylist(playlistName: string, songs: SearchResult[]) {
    console.log("creating playlist.. " );

    const accessToken = getAccessTokenFromCookie();

    if (!accessToken) {
      // User is not authorized, redirect to authorize
      console.log("invalid token -> redirect to authorize.." );
      authorizeWithSpotify();
      return;
    }

    console.log("access token is valid -> creating playlist...");
    await savePlaylistToSpotify(playlistName, songs);
  }

  const handlePlayPauseButtonClick = () => {
    if (isPlaying) {
      // Pause the song
      setIsPlaying(false);
      pauseSong();
    } else {
      // Play the song
      setIsPlaying(true);
      playSong(currTrackId);
    }
  };


  return (
    <section className={props.viewState}>
      <h2>Your Recommended Playlist</h2>
      <button id="back-btn" className="mobile-hidden">
        <img src={arrow_back} alt="A back icon shaped like a bent arrow" className="arrow-back"></img>
        <span className="bold">Try another song</span>
      </button>
      <section id="desktop-wrapper">
        <section id="song-player" >
          <div>
            <img src={currImg} alt="The song cover" className="song-img"></img>
            <div className="current-song">
              <span className="h-title bold">{currTitle}</span>
              <span className="h2">By {currArtist}</span>
            </div>
          </div>
          <div id="progress-bar-container">
          <div id="no-preview-msg"></div>
            <div id="song-time">00:00</div>
            <div id="progress-bar" style={{ width: '0%' }}></div>
          </div>
          <div id="player-controls-wrapper" className='flex'>
            <div className="play-btn-container" onClick={handlePlayPauseButtonClick}>
              {isPlaying ? (
                <img src={pause_btn} className="pause-btn" alt="an icon of a pause button"></img>
              ) : (
                <img src={play_btn} className="play-btn" alt="an icon of a play button"></img>
              )}
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

        <section id="playlist-wrapper">
          <button id="spotify-btn" onClick={() => createSpotifyPlaylist('MyTestSavedPLaylist', [])}>
            <span className="bold">Save to Spotify</span>
            <img src={spotify_icon} className="spotify-icon" alt="Spotify icon"></img>
          </button>
          <section className="song-results-container-parent">
            <h2>Your Recommended Playlist</h2>
            {
              // <div className="results-label h4 bold">
              //   <p></p>
              //   <p>Artist</p>
              //   <p>Song</p>
              //   <p>Genre</p>
              // </div>
            }
            <hr></hr>
            {
              props.recArray.map((song: any) => (
                <SongResult onClick={(e: any) => {
                  handleSongClick(song);
                }}
                  key={song.artist + song.title}
                  src={song.imgUrl}
                  artist={song.artist} title={song.title} genre={song.genre} />
              ))
            }
          </section>
        </section>
      </section>

      <section id="playlist-wrapper-mobile">
        <button id="back-btn-mobile" className="icon-mobile">
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
            <img src={currImg} alt="The song cover" className="song-img-mobile"></img>
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
              <SongResult design="generated_playlist" onClick={() => { handleSongClick(song) }}
                key={song.artist + song.title}
                artist={song.artist} title={song.title} genre={song.genre} />
            ))
          }
        </section>
      </section>
    </section>
  )
};

export default GeneratedPlaylist;