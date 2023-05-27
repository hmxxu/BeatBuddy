import React, { useState } from 'react';

import '../styles/songSearch.css';
import SongResult from './SongResult';
import { id, hideGenerateButton, hideMoodContainer, hideSearchDropdown, showMoodContainer, clearMoodButtons } from '../utils';

import { searchSpotify } from '../beatbuddy/src/APIFunctions/ReturnSongStats';
import { SearchResult } from '../utils';

function SearchBar(props:any) {

  window.addEventListener("load", init);

  const [selectedDisplay, setSelectedDisplay] = useState("Miku - Miku");

  // Array of songs
  const initialSongs : Array<SearchResult> = [];
  const [currSongsState, setSongsState] = useState(initialSongs);

  function init() {
    // search button
    id("search-song-btn").addEventListener("click", searchSongs);
    id("song-search").addEventListener("keyup", (e : any) => {
      if (e.key === 'Enter' || e.keyCode === 13) {
        searchSongs();
      }
    })
  }

  /**
   * Hides the currently selected song overlay that appears over the search bar
   */
  function hideSelectedSong(e : any) {
    //selected-song button inside input
    let selectedSongBtn = e.currentTarget;

    console.log("Selected song btn clicked")
    selectedSongBtn.classList.add("hidden");

    // closes mood container when user removes a song from search bar
    hideMoodContainer();

    // closes generate button and resets the mood button state when user removes a song from search bar
    clearMoodButtons();
    hideGenerateButton();

    // reenable searchbar
    (id("song-search") as HTMLInputElement).disabled = false;
  }

  /**
   * When the user searches a song, this function will update the song results
   */
  async function searchSongs() {
    id("search-results").classList.remove('close-container');
    try {
      id("error-logging").textContent = "Loading... May take a few seconds!";
      id("search-results").classList.add("hidden");

      // get user input
      let searchInput : HTMLInputElement = id('song-search') as HTMLInputElement;
      let userInput : string = searchInput.value;

      // Get songs from backend
      let songs : SearchResult[] = await searchSpotify(userInput);
      // check if not results
      if (songs.length === 0) {
        id("error-logging").textContent = "No results. Try another search";
      } else {
        setSongsState(songs);
        id("error-logging").textContent = "";
        id("search-results").classList.remove("hidden");
      }

    } catch (err : any) {
      id("error-logging").textContent = "Something went wrong. Refresh and try again.";
    }
  }

  /**
   * Updates the selected song when song result is clicked
   * @param {Array<Array<string>>} song - Song array arranged like [artist, song, genre]
   */
  const handleSongClick = (song : any) => {
    setSelectedDisplay(song.artist + " - " + song.title)
    id("selected-song").classList.remove("hidden");

    // disable search bar
    (id("song-search") as HTMLInputElement).disabled = true;

    // Hides the search dropdown
    hideSearchDropdown();

    // Shows the mood container
    showMoodContainer();

    props.setIds(song.id, song.artistId);
  }

  return(
    <div className="search-container">
      <label htmlFor="song-search"><h2>Pick a Song!</h2></label>
      <div id="song-search-wrapper">
        <input type="text" id="song-search" placeholder='Search a song... ' ></input>
        <button id="search-song-btn">
          <span className="material-symbols-rounded" >
            search
          </span>
        </button>
        <button id="selected-song" className="hidden" onClick={hideSelectedSong}>
          <p className="h4 bold">{selectedDisplay}</p>
          <span className="material-symbols-rounded">
            close
          </span>
        </button>
      </div>
      <p id="error-logging" className='bold h2'></p>
      <section id="search-results" className="hidden song-results-container">
        {
          currSongsState.map((song : any) => (
            // * for searchbar design, show song-result-mobile, hide song-playlist-mobile
            <SongResult design="searchbar" onClick={() => {handleSongClick(song)}}
            key={song.id}
            id = {song.id} src={song.imgUrl}
            artist={song.artist} title={song.title} genre={song.genres}/>
          ))
        }
      </section>
    </div>
  )
};

export default SearchBar;