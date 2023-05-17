import React from 'react';
import GeneratedPlaylist from './GeneratedPlaylist';
import SearchBar from './SearchBar';
import Filter from './Filter';
import { id, qs } from '../utils';
import accordion_icon from '../images/accordion-close.png';
import { returnDummyRec, returnSpotifyRec } from '../beatbuddy/src/APIFunctions/ReturnSongStats';
import { useState } from 'react';
import { SearchResult } from '../utils';

function PlaylistReady() {
 
  // data gathered from SearchBar
  const [songId, setSongId] = useState("");

    // data gathered from SearchBar
    const [artistId, setArtistId] = useState("");

  // Data gathered from genre filter
  const [genreList, setGenreList] = useState([]);

  // Data gathered from decades filter
  const [decadeList, setDecadeList] = useState([]);

  // initial recommendations list to determine type
  const initialRecs : SearchResult[] = [];

  // reccomendation data, passed to GeneratedPlaylist. Output of recommendation algorithm
  const [recData, setRecData] = useState(initialRecs);

  // controls if user sees GeneratedPlaylist or not
  const [playlistViewState, setPlaylistViewState] = useState("hidden");

  /**
   * Called when user selects a song from the searchbar
   * @param childData - the song ID that the user selected
   */
  const getIds = (songData : any, artistData : any) => {
    setSongId(songData);
    setArtistId(artistData);
    
    // show filters div
    document.querySelector('.accordion')!.classList.remove("hidden");
  }

  /**
   * Called when the user enables/disables the genres filter or when user
   * adds or removes a genre filter
   * If no filter selected, defaults to full list
   * @param selectedList - list of currently selected genres
   * @param fullList - list of all genres
   */
  const getGenreArray = (selectedList: any, fullList : any) => {
    if (selectedList.length > 0) { 
      setGenreList(selectedList);
    } else {
      setGenreList(fullList);
    }
    //console.log(selectedList);
  }

  /**
   * Called when the user enables/disables the decades filter or when user
   * adds or removes a decades filter
   * If no filter selected, defaults to full list
   * @param {Array<String>} selectedList - list of current selected decades
   * @param fullList - list of all available decades
   */
  const getDecadeArray = (selectedList : any, fullList: any) => {
    if (selectedList.length > 0) { 
      setDecadeList(selectedList);
    } else {
      setDecadeList(fullList);
    }
    //console.log(selectedList);

  }

  function delayOverflow() {
    let checkbox = id('customize-box') as HTMLInputElement;
    if (checkbox.checked) {
      //console.log('checkbox is checked');
      setTimeout(() => {
        // id('two-filter').classList.add('overflow-visible');
        id('two-filter').style.overflow = "visible";
      }, 400);
    } else {
      id('two-filter').style.overflow = "hidden";
    }
  }

  /**
   * generates Recommendates and displays it to the user by updating the state
   * The state is then passed down to the GeneratedPlaylist component
   */
  async function generateRec() {
    let limit: number = 20;
    let artists_seed: string[] = [artistId];
    let genres_seed: string[] = genreList;
    let tracks_seed: string[] = [songId];

    console.log(genreList);

    // get recommendations based on selected song
    let data = await returnSpotifyRec(limit, artists_seed, genres_seed, tracks_seed);

    // convert recommended songs to searchResult[]
    let recArray : SearchResult[] = [];

    // genre array is empty for now
    data.tracks.forEach((t) => {
      recArray.push(new SearchResult(t.artists[0].name, t.artists[0].id,
        t.name, t.id, [], t.album.images[1].url));
    })
    setRecData(recArray);
    setPlaylistViewState("");
  }

  /**
   * Shows the "playlist is ready" div after user clicks on the dropdown to open the filters
   */
  function showGenerate() {
    id('generateReady').classList.remove('hidden');
  }

  return(
    <div>
      <SearchBar setIds={ getIds } />
      <div className="accordion">
        {/* <span className="customize-text h2 bold">Customize your playlist</span> */}
        <input type="checkbox" name="accordion" id="customize-box" onClick={delayOverflow}/>
        <label htmlFor="customize-box" className="customize-label h2 bold">
          <span className="customize-text h2 bold">Customize your playlist</span>
          <img src={accordion_icon} alt="accordion-close" className="accordion-icon" onClick={showGenerate}></img>
        </label>
        <h4>Use our filters to customize your recommended playlist.</h4>
        <div id="two-filter">
          <Filter content="Time Period" key="language-filter" type="language-filter" childToParent={getDecadeArray}/>
          <Filter content="Genre" key="genre-filter" type="genre-filter" childToParent={getGenreArray}/>
        </div>
      </div>


      <div id='generateReady' >
          <h2>That's it! Your playlist is now ready.</h2>
          <button id="generate-playlist-btn" onClick={generateRec}>Generate my playlist</button>
      </div>
      <GeneratedPlaylist viewState={ playlistViewState } recArray={ recData } />
    </div>
  )
};

export default PlaylistReady;