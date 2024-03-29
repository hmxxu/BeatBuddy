import React, { useState, useEffect } from 'react';
import play_btn from '../images/play-btn.png';
import pause_btn from '../images/pause-btn.png';
import arrow_back from '../images/arrow-back.png';
import spotify_icon from '../images/spotify-icon.png';
import spotify_icon_official from '../images/spotify-icon-official.png';

import '../styles/generatedPlaylist.css';
import '../styles/songSearch.css';
import SongResult from './SongResult';
import { clearMoodButtons, hidePlaylistContainer, processImage, qs, openModal, showSearchContainer, showWebsiteIntro } from '../utils';
import { getAccessTokenFromCookie } from '../beatbuddy/src/spotify/tokenCookies';
import { returnSongFeatures } from '../beatbuddy/src/APIFunctions/ReturnSongStats';
import { SearchResult } from '../utils';
import { playSong, pauseSong, stopSong } from '../beatbuddy/src/spotify/getSong';
import { createSpotifyPlaylist } from './CreatePlaylist';

export function updateProgressBar(audio: any) {
  const progressBar = document.getElementById('progress-bar');
  const timeElement = document.getElementById('song-time');

  const progressBarMobile = document.getElementById('progress-bar-mobile');
  const timeElementMobile = document.getElementById('song-time-mobile');

  // ************* For desktop *******************
  if (progressBar && timeElement && audio) {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progress}%`;

    const remainingTime = audio.duration - audio.currentTime;
    timeElement.innerText = formatTime(remainingTime);
  }

  // ************** For Mobile *******************
  if (progressBarMobile && timeElementMobile && audio) {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBarMobile.style.width = `${progress}%`;

    const remainingTime = audio.duration - audio.currentTime;
    timeElementMobile.innerText = formatTime(remainingTime);
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
  // const msg = document.getElementById("no-preview-msg");
  const msgList = document.querySelectorAll("#no-preview-msg");
  if (msgList) {
    msgList.forEach((item) => {
      const htmlItem = item as HTMLElement;
      htmlItem.innerText = "No preview of the song available";
      htmlItem.style.display = "block";
    })
  }
  // if (msg) {
  //   msg.innerText = "No preview of the song available.";
  //   msg.style.display = "block";
  // }
}

export function removePreviewMsg() {
  // const msg = document.getElementById("no-preview-msg");
  // if (msg) {
  //   msg.style.display = "none";
  // }
  const msgList = document.querySelectorAll("#no-preview-msg");
  if (msgList) {
    msgList.forEach((item) => {
      const htmlItem = item as HTMLElement;
      htmlItem.style.display = "none";
    })
  }
}

export function hasUserLoggedIn() {
  let accesstoken = getAccessTokenFromCookie();
  if (accesstoken === null || accesstoken === "undefined") {
    return false;
  }
  return true;
}

function GeneratedPlaylist(props: any) {

  const [currPlaylist, setCurrPlaylist] = useState<SearchResult[]>([]);
  const [currTitle, setCurrTitle] = useState("");
  const [currArtist, setCurrArtist] = useState("");
  const [currImg, setCurrImg] = useState("");
  const [currTrackId, setCurrTrackId] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const [playPauseBtn, setPlayPauseBtn] = useState(play_btn);

  const [currEnergy, setEnergy] = useState(0);
  const [currValence, setValence] = useState(0);
  const [currDance, setDance] = useState(0);

  // * Custom event listener from getSong.ts to visually change the button when audio has ended
  useEffect(() => {
    const handleAudioEnded = (e: any) => {
      if (e.detail.action) {
        setIsPlaying(false);
      }
    };
    window.addEventListener('audioEnded', handleAudioEnded);

    return () => {
      window.removeEventListener('audioEnded', handleAudioEnded);
    };
  }, []);

  /**
   * Upon the recArray change (when new playlist is generated),
   * update the player to display the first song.
   */
  useEffect(() => {
    if (props.recArray.length > 0) {
      handleSongClick(props.recArray[0]);
      setCurrPlaylist(props.recArray);
    }
  }, [props.recArray])

  function changeModalMessage(message: string) {
    props.setModalMessage(message);
  }

  /*
  * Updates the selected song when song result is clicked
  * (in song player)
  * @param song - Song array arranged like [artist, song, genre]
  */
  async function handleSongClick(song: any) {
    console.log('handleSongClick called');

    stopSong(); // Stop the currently playing song
    setIsPlaying(false); // Reset the isPlaying state to false
    setPlayPauseBtn(pause_btn);

    setCurrTitle(song.title);
    setCurrArtist(song.artist);
    setCurrImg(song.imgUrl);
    setCurrTrackId(song.id);

    // get features and display
    const featuresJSON = await returnSongFeatures(song.id);
    setEnergy(Math.round(featuresJSON.energy * 100));
    setValence(Math.round(featuresJSON.valence * 100));
    setDance(Math.round(featuresJSON.danceability * 100));

    // changes background color of the website depending on the song cover image
    let songImg = song.imgUrl;
    processImage(songImg);

    // playing preview of songs
    console.log('handeSongClick')
    handleSongProgressBar();
    removePreviewMsg();

    handleSongChange(song.id);
  }

  function handleSongChange(currentTrackId: any) {
    if (hasUserLoggedIn()) {
      console.log('hande song change...');
      setIsPlaying(true);
      playSong(currentTrackId);
    } else {
      changeModalMessage("Authorization Needed: To listen to song previews, please \n\
      login with your Spotify account.");
      openModal();
    }
  }

  function handleSongProgressBar() {
    console.log('handleSongProgressBar');
    // Reset the song progress bar and display the play button
    const progressBar = document.getElementById('progress-bar');
    const progressBarMobile = document.getElementById('progress-bar-mobile');
    const songTimeElement = document.getElementById('song-time');
    const songTimeElementMobile = document.getElementById('song-time-mobile');
    if (progressBar && songTimeElement) {
      progressBar.style.width = '0%';
      progressBar.innerText = '';
      songTimeElement.innerText = "";
      if (progressBarMobile && songTimeElementMobile) {
        progressBarMobile.style.width = '0%';
        progressBarMobile.innerText = '';
        songTimeElementMobile.innerText = "";
      }
    }
  }

  /**
   * Gets the currently selected song and changes the color of the container to make
   * it look distinctive.
   * @param currentSong The currently selected song
   */
  function setActiveSong(currentSong: any) {
    clearActiveSongColor();
    currentSong.classList.add('activeSongColor');
  }

  function clearActiveSongColor() {
    // for desktop
    let parent = qs(".song-results-container-parent");
    parent.querySelectorAll(":scope > .song-result-container").forEach((container: any) => {
      container.firstChild.classList.remove('activeSongColor');
    })

    let parentMobile = qs(".results-mobile");
    parentMobile.querySelectorAll(":scope > .song-result-container").forEach((container: any) => {
      container.childNodes[2].classList.remove('activeSongColor');
    })
  }


  function saveCurrentPlaylist(playlistName: string, currPlaylist: SearchResult[]) {

    if (hasUserLoggedIn()) {
      createSpotifyPlaylist(playlistName, currPlaylist);
      changeModalMessage("Your playlist has been \n saved to Spotify! 🎉");
      openModal();
    } else {
      changeModalMessage("Error saving playlist. \n Please login or retry.");
      openModal();
    }

  }

  function generatePlaylistName() {
    return props.playlistName;
  }

  function handlePlayPauseButtonClick() {
    if (hasUserLoggedIn()) {
      if (isPlaying) {
        setIsPlaying(false);
        pauseSong();
      } else {
        setIsPlaying(true);
        playSong(currTrackId);
      }
    } else {
      changeModalMessage("Authorization Needed: To listen to song previews, please \n\
      login with your Spotify account.");
      openModal();
    }
  };

  // Reverts back to the default state of the website (i.e. only having a search bar) after
  // user clicks "Try another song" button
  function revertToDefault() {
    clearMoodButtons();
    hidePlaylistContainer();
    showSearchContainer();
    showWebsiteIntro();
    stopSong();
    document.documentElement.style.setProperty("--body-color", "linear-gradient(#6380E8, #A9A2FF)");
    document.documentElement.style.setProperty("--hover-color", "#9E98FE");
    document.documentElement.style.setProperty("--play-btn-color", "#6481E8");
    document.documentElement.style.setProperty("--song-result-color", "#D5D1FF");
    document.documentElement.style.setProperty("--song-result-text-color", "#000000");
    props.hideSongSelected();
  }

  return (
    <section className={props.viewState} id='playlist-container'>
      <button id="back-btn" className="mobile-hidden" onClick={revertToDefault}>
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
          <div className="progress-bar-container">
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
          {/* <a href={"https://open.spotify.com/track/" + currTrackId} target="_blank" rel="noopener noreferrer"><p>Listen on Spotify</p></a> */}
          <div className="song-stats flex">
            <div id="energy" className="attrs">
              <h3>Energy</h3>
              {/* <h1>90%</h1> */}
              <p className="h-title bold">{currEnergy + "%"}</p>
            </div>
            <div className="vl"></div>
            <div className="attrs">
              <h3>Positivity</h3>
              {/* <h1>10%</h1> */}
              <p className="h-title bold">{currValence + "%"}</p>
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
          <button id="spotify-btn" onClick={() => saveCurrentPlaylist(generatePlaylistName(), currPlaylist)}>
            <span className="bold">Save playlist</span>
            <img src={spotify_icon} className="spotify-icon" alt="Spotify icon"></img>
          </button>
          <section className="song-results-container-parent">
            <h2>Your Recommended Playlist</h2>
            {
              props.recArray.map((song: any, index: number) => (
                <SongResult onClick={async function (e: any) {
                  let container = e.currentTarget;
                  setActiveSong(container);
                  await handleSongClick(song);
                  // handlePlayPauseButtonClick();
                }}
                  index={index}
                  currTrackId={currTrackId}
                  id={song.id}
                  key={song.artist + song.title}
                  src={song.imgUrl}
                  artist={song.artist} title={song.title} genre={song.genre}/>
              ))
            }
          </section>
        </section>
      </section>

      <section id="playlist-wrapper-mobile">
        <button id="back-btn-mobile" className="icon-mobile" onClick={revertToDefault}>
          <img src={arrow_back} alt="A back icon shaped like a bent arrow" className="arrow-back-mobile"></img>
          <span className="bold"></span>
        </button>
        <button id="spotify-btn" className="icon-mobile" onClick={() => saveCurrentPlaylist(generatePlaylistName(), currPlaylist)}>
          <span className="h5 bold icon-mobile">Save playlist</span>
          <img src={spotify_icon} className="spotify-icon" alt="Spotify icon"></img>
        </button>
        <section id="song-player-mobile">
          <div className="flex-mobile">
            <div className="current-song-mobile">
              <span className="h2 bold">{currTitle}</span>
              <span className="h4 bold">{currArtist}</span>
            </div>
            <img src={currImg} alt="The song cover" className="song-img-mobile"></img>
          </div>

          <div className="progress-bar-container">
            <div id="no-preview-msg"></div>
            <div id="song-time-mobile">00:00</div>
            <div id="progress-bar-mobile" style={{ width: '0%' }}></div>
          </div>

          <a href={"https://open.spotify.com/track/" + currTrackId} target="_blank" rel="noopener noreferrer"><p>Listen on Spotify</p></a>
          <div className="song-stats-mobile flex-song">
            <div className="attrs">
              <h5>Energy</h5>
              <h2>{currEnergy + "%"}</h2>
            </div>
            <div className="vl-mobile"></div>
            <div className="attrs">
              <h5>Positivity</h5>
              <h2>{currValence + "%"}</h2>
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
            props.recArray.map((song: any, index: number) => (
              // * for generated_playlist design, show song-playlist-mobile, hide song-result-mobile
              <SongResult design="generated_playlist"
                onClick={async function (e: any) {
                  let container = e.currentTarget;
                  setActiveSong(container);
                  await handleSongClick(song);
                }}
                index={index}
                key={song.artist + song.title} id={song.id}
                artist={song.artist} title={song.title} genre={song.genre}
                setModalMessage={props.setModalMessage}
                isPlaying={isPlaying} setIsPlaying={setIsPlaying}
                currTrackId={currTrackId}
                playPauseBtn={playPauseBtn} />
            ))
          }
        </section>
      </section>
    </section>
  )
};

export default GeneratedPlaylist;