import React from 'react';

import play_btn from './../images/play-btn.png';

function SongResult(props: any) {
  let id = props.id;
  let src = props.src;
  let artist = props.artist;
  let title = props.title;
  let genre = props.genre;

  const style = {
    color: "black"
  };
  // onClick will call the function in SearchBar
  return (
    <div className="song-result-container">

      {/* The code below is for desktop */}
      <div className="song-result h4" style={style} onClick={props.onClick} id={id}>
        <img src={src} alt="album cover" id="album-cover"></img>
        <div>
          <h4 id="title">{title}</h4>
          <p id="artist">{artist}</p>
          <p id="genre">{genre}</p>
        </div>
      </div>

      <div className={"song-result-mobile" + ((props.design === "searchbar") ? "" : " hidden")} onClick={props.onClick} id={id}>
        <p id="artist-title" className="semi-bold">{artist} - {title}</p>
        {/* <p id="title">{title}</p> */}
        <p id="genre">{genre}</p>
      </div>

      {/* The code below is for mobile */}
      <div className={"song-playlist-mobile" + ((props.design === "generated_playlist") ? "" : " hidden")} onClick={props.onClick} id={id}>
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