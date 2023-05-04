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
    <div className="song-result-container">

      {/* The code below is for desktop */}
      <div className="song-result h4" onClick={props.onClick}>
        <img src={minami} alt="album cover" id="album-cover"></img>
        <p id="artist">{artist}</p>
        <p id="title">{title}</p>
        <p id="genre">{genre}</p>
      </div>

      <div className={"song-result-mobile" + ((props.design === "searchbar") ? "" : " hidden")} onClick={props.onClick}>
        <p id="artist-title" className="semi-bold">{artist} - {title}</p>
        {/* <p id="title">{title}</p> */}
        <p id="genre">{genre}</p>
      </div>

      {/* The code below is for mobile */}
      <div className={"song-playlist-mobile" + ((props.design === "generated_playlist") ? "" : " hidden")} onClick={props.onClick}>
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