import React, { useState } from 'react';

import '../styles/songSearch.css';
import SongResult from './SongResult';
import { id, qs } from '../utils';

function SearchBar() {

  window.addEventListener("load", init);

  const [selectedState, setSelectedState] = useState("hidden");
  const [selectedDisplay, setSelectedDisplay] = useState("Miku - Miku");

  // temp
  const [currSongsState, setSongsState] = useState(
    [
      {"artist" : "minami", "title" : "Eternal Blue", "genre" : "J-pop", "id" : "XXX"},
      {"artist" : "deco*27", "title" : "vampire", "genre" : "Vocaloid", "id" : "XXX"},
      {"artist" : "ryo", "title" : "melt", "genre" : "Vocaloid", "id" : "XXX"},
      {"artist" : "minami", "title" : "Very very very long title", "genre" : "J-pop", "id" : "XXX"},
    ]
  );

  function init() {
    // search button
    qs("input + button").addEventListener("click", searchSongs);

    //selected-song button inside input
    let selectedSongBtn = id("selected-song");

    // remove a selected song
    selectedSongBtn.addEventListener("click", function() {
      setSelectedState("hidden");

      // reenable searchbar
      (id("song-search") as HTMLInputElement).disabled = false;
    })
  }

  /**
   * When the user searches a song, this function will update the song results
   */
  function searchSongs() {
    // for now, temporary implementation that just appends songs to the results container
    let songsContainer = id("search-results");

    // temporary. Fetch songs from backend later
    let songs =
      [
        {"artist" : "minami", "title" : "Eternal Blue", "genre" : "J-pop", "id" : "XXX"},
        {"artist" : "deco*27", "title" : "vampire", "genre" : "Vocaloid", "id" : "XXX"},
        {"artist" : "ryo", "title" : "melt", "genre" : "Vocaloid", "id" : "XXX"},
        {"artist" : "minami", "title" : "Very very very long title Very very very long title Very very very long title Very very very long title Very very very long title ", "genre" : "J-pop", "id" : "XXX"},
      ];


    setSongsState(songs);

    // show container
    songsContainer.classList.remove("visibility-hidden");
  }

  /**
 * Returns the element that has the ID attribute with the specified value.
 * @param {string} id - element ID
 * @return {object} DOM object associated with id.
 */
  // function id(id: any) {
  //   return document.getElementById(id)!;
  // }

  /**
 * Returns the array of elements that match the given CSS selector.
 * @param {string} query - CSS query selector
 * @returns {object[]} array of DOM objects matching the query.
 */
  function qsa(query: any) {
    return document.querySelectorAll(query);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} query - CSS query selector.
   * @return {object[]} array of DOM objects matching the query.
   */
  // function qs(query: any) {
  //   return document.querySelector(query);
  // }

  /**
   * Updates the selected song when song result is clicked
   * @param song - Song array arranged like [artist, song, genre]
   */
  const handleSongClick = (song : any) => {
    setSelectedDisplay(song.artist + " - " + song.title)
    setSelectedState("");
    // disable search bar
    (id("song-search") as HTMLInputElement).disabled = true;
  }

  return(
    <div>
      <label htmlFor="song-search"><h2>Pick a Song!</h2></label>
      <section id="song-search-wrapper">
        <input type="text" id="song-search" placeholder='Search a song... ' ></input>
        <button>
          <span className="material-symbols-rounded">
            search
          </span>
        </button>
        <button id="selected-song" className={selectedState}>
          <p className="h4 bold">{selectedDisplay}</p>
          <span className="material-symbols-rounded">
            close
          </span>
        </button>
      </section>
      <section id="search-results" className="visibility-hidden song-results-container">
        <div className="results-label h4 bold">
          <p className="mobile-hidden"></p>
          <p>Artist</p>
          <p>Title</p>
          <p>Genre</p>
        </div>
        <hr></hr>
        {
          currSongsState.map((song : any) => (
            // * for searchbar design, show song-result-mobile, hide song-playlist-mobile
            <SongResult design="searchbar" onClick={() => {handleSongClick(song)}}
            key={song.artist + song.title}
            artist={song.artist} title={song.title} genre={song.genre}/>
          ))
        }
      </section>
    </div>
  )
};

export default SearchBar;