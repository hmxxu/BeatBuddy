import React from 'react';

// temp -- testing purposes
import minami from './../images/minami.jpg';
import play_btn from './../images/play-btn.png';

function SongResult(props: any) {
  let artist = props.artist;
  let title = props.title;
  let genre = props.genre;

  // onClick will call the function in SearchBar
  return (
    <div className="song-result" onClick={props.onClick}>
      <img src={minami} alt="album cover"></img>
      <div className="song-container-mobile">
        <p>{title}</p>
        <p>{artist}</p>
      </div>
      <p id="artist">{artist}</p>
      <p id="title">{title}</p>
      <p id="genre">{genre}</p>
      <div className="play-btn-container">
        <img src={play_btn} className="play-btn" alt="an icon of a play button"></img>
      </div>
    </div>
  )
};

export default SongResult;