import React, { useState, useEffect } from 'react';
import play_btn from './../images/play-btn.png';
import pause_btn from '../images/pause-btn.png';
import { getAccessTokenFromCookie } from '../beatbuddy/src/spotify/tokenCookies';
import { hasUserLoggedIn } from './GeneratedPlaylist';
import {openModal} from '../utils';
import { playSong, pauseSong, stopSong } from '../beatbuddy/src/spotify/getSong';
import spotify_icon from '../images/spotify-icon.png';

function SongResult(props: any) {

  let src = props.src;
  let artist = props.artist;
  let title = props.title;

  let isFirstChild = false;
  if (props.index === 0 && props.index !== undefined) {
    isFirstChild = true;
  }

  const [playPauseBtn, setPlayPauseBtn] = useState(play_btn);

  // This useEffect handles the play/pause btn when users changes song
  useEffect(() => {
    console.log('currTrackId changes: ' + props.currTrackId);
    if (props.currTrackId === props.id) {
      setPlayPauseBtn(pause_btn);
    } else {
      setPlayPauseBtn(play_btn);
    }
    // actually dont need props.id below but if I don't include it the eslint will complain
  }, [props.currTrackId, props.id])

  function changeModalMessage(message: string) {
    props.setModalMessage(message);
  }

  // This method handles the play/pause btn when user tries to pause the song
  const handlePlayPauseButtonClick = () => {
    console.log('handlePlayPauseButton called new')
    if (hasUserLoggedIn()) {
      if (props.isPlaying) {
        props.setIsPlaying(false);
        setPlayPauseBtn(play_btn);
        pauseSong();
      } else {
        props.setIsPlaying(true);
        setPlayPauseBtn(pause_btn);
        playSong(props.currTrackId);
      }
    } else {
      changeModalMessage("Authorization Needed: To listen to song previews, please \n\
      login with your Spotify account.");
      openModal();
    }
  };

  // onClick will call the function in SearchBar
  return (
    <div className={"song-result-container"}>

      {/* The code below is for desktop (both used in playlist and search bar) */}
      <div className={"song-result h4" + ((isFirstChild) ? " activeSongColor" : "")} onClick={props.onClick}>
        <img src={src} alt="album cover" id="album-cover"></img>
        <div className="song-result-flex">
          <div>
            <h4 id="title">{title}</h4>
            <p id="artist">{artist}</p>
          </div>
          <a href={"https://open.spotify.com/track/" + props.currTrackId} target="_blank" rel="noopener noreferrer">
            <img src={spotify_icon} title="Play on Spotify" className="spotify-icon-small" alt="Spotify icon"></img>
          </a>
        </div>
      </div>

      {/* This is for search bar mobile */}
      <div className={"song-result-mobile" + ((props.design === "searchbar") ? "" : " hidden")} onClick={props.onClick}>
        <p id="artist-title" className="semi-bold">{artist} - {title}</p>
      </div>

      {/* The code below is for mobile */}
      <div className={"song-playlist-mobile" + ((isFirstChild) ? " activeSongColor" : "") + ((props.design === "generated_playlist") ? "" : " hidden")} onClick={props.onClick}>
        <div className="song-container-mobile">
          <p className="bold">{title}</p>
          <p>{artist}</p>
        </div>
        <div className="play-btn-container-small" onClick={function (e: any) {
            e.stopPropagation();
            handlePlayPauseButtonClick();
          }}>
            <img src={playPauseBtn} className="play-pause-btn-small" alt="an icon of a pause button"></img>
        </div>
      </div>
    </div>
  )
};

export default SongResult;