import React from 'react';
import play_btn from './../images/play-btn.png';
import spotify_icon from '../images/spotify-icon.png';

function SongResult(props: any) {

  let src = props.src;
  let artist = props.artist;
  let title = props.title;

  let isFirstChild = false;
  if (props.index === 0 && props.index !== undefined) {
    isFirstChild = true;
  }

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
          <a href={"https://open.spotify.com/track/" + props.currTrackId}
          className={((props.design === "searchbar") ? "hidden" : "")} target="_blank" rel="noopener noreferrer">
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
        <div className="play-btn-container-small">
          <img src={play_btn} className="play-btn-small" alt="an icon of a play button"></img>
        </div>
      </div>
    </div>
  )
};

export default SongResult;