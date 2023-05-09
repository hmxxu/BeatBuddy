import React from 'react';
import GeneratedPlaylist from './GeneratedPlaylist';
import SearchBar from './SearchBar';
import Filter from './Filter';
import { id, qs } from '../utils';
import accordion_icon from '../images/accordion-close.png';
import { returnDummyRec } from '../beatbuddy/src/APIFunctions/ReturnSongStats';
import { useState } from 'react';

function PlaylistReady() {

  const [songId, setSongId] = useState("");
  const [genreList, setGenreList] = useState([]);
  const [decadeList, setDecadeList] = useState([]);

  const getSongId = (childData : any) => {
    setSongId(childData)
  }

  const getGenreArray = (selectedList: any, fullList : any) => {
    if (selectedList.length > 0) { 
      setGenreList(selectedList);
    } else {
      setGenreList(fullList);
    }
    console.log(selectedList);
  }

  const getDecadeArray = (selectedList : any, fullList: any) => {
    if (selectedList.length > 0) { 
      setDecadeList(selectedList);
    } else {
      setDecadeList(fullList);
    }
    console.log(selectedList);

  }

  function delayOverflow() {
    let checkbox = id('customize-box') as HTMLInputElement;
    if (checkbox.checked) {
      console.log('checkbox is checked');
      setTimeout(() => {
        // id('two-filter').classList.add('overflow-visible');
        id('two-filter').style.overflow = "visible";
      }, 400);
    } else {
      id('two-filter').style.overflow = "hidden";
    }
  }

  async function generateRec() {
    let limit: number = 20;
    let artists_seed: string[] = ['0PHf0oiic0xAnCrRuLTtHl'];
    let genres_seed: string[] = ['j-pop'];
    let tracks_seed: string[] = ['69aL4LJK092UFLmWtFeFFy'];

    let spotify_artist_id = '0PHf0oiic0xAnCrRuLTtHl';
    let data = await returnDummyRec(spotify_artist_id);
    console.log(data);
  }
  return(
    <div>
      <SearchBar childToParent={ getSongId }/>
      <div className="accordion">
      {/* <span className="customize-text h2 bold">Customize your playlist</span> */}
      <input type="checkbox" name="accordion" id="customize-box" onClick={delayOverflow}/>
      <label htmlFor="customize-box" className="customize-label h2 bold">
        <span className="customize-text h2 bold">Customize your playlist</span>
        <img src={accordion_icon} alt="accordion-close" className="accordion-icon"></img>
      </label>
      <h4>Use our filters to customize your recommended playlist.</h4>
      <div id="two-filter">
        <Filter content="Time Period" key="language-filter" type="language-filter" childToParent={getDecadeArray}/>
        <Filter content="Genre" key="genre-filter" type="genre-filter" childToParent={getGenreArray}/>
      </div>
    </div>


      <div>
          <h2>That's it! Your playlist is now ready.</h2>
          <button id="generate-playlist-btn">Generate my playlist</button>
      </div>
      <GeneratedPlaylist/>
    </div>
  )
};

export default PlaylistReady;