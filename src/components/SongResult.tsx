import React from 'react';

// temp -- testing purposes
import minami from './../images/minami.jpg';

function SongResult(props: any) {
  let artist = props.artist;
  let title = props.title;
  let genre = props.genre;

  // onClick will call the function in SearchBar
  return (
    <div className="song-result" onClick={props.onClick}>
      <img src={minami} alt="album cover"></img>
      <p>{artist}</p>
      <p>{title}</p>
      <p>{genre}</p>
    </div>
  )
};

export default SongResult;