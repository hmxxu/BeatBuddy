import React from 'react';

import '../styles/songSearch.css';

function SearchBar() {

  window.addEventListener("load", init);

  function init() {
    // search button
    qs("input + button").addEventListener("click", searchSongs);

    //selected-song button inside input
    let selectedSongBtn = id("selected-song");

    // remove a selected song
    selectedSongBtn.addEventListener("click", function() {
      this.classList.add("display-hidden");
    })
  }

  function searchSongs() {
    // for now, temporary implementation that just appends songs to the results container
    let songsContainer = id("song-results-container");
    
    // remove old songs in container
    let currSongs = qsa(".song-result");
    currSongs.forEach(song => {
      song.remove();
    });

    // temporary. Fetch songs from backend later
    let songs = [["minami", "Eternal Blue", "J-pop"], 
                ["deco*27", "vampire", "Vocaloid"],
                ["Ryo", "melt", "Vocaloid"]];

    // add each song fetched to results
    songs.forEach(song => {
      let newResult : Element = document.createElement("div");
      newResult.classList.add ("song-result");

      for (let i : number = 0; i < song.length; i++) {
        let metadata = document.createElement("p");
        metadata.textContent = song[i];
        newResult.appendChild(metadata);
      }

      newResult.addEventListener("click", function() {
        let selectedSongBtn = id("selected-song");
        selectedSongBtn.children[0].textContent = song[0] + " - " + song[1];
        selectedSongBtn.classList.remove("display-hidden");
      })
      songsContainer.appendChild(newResult);
    });  

    // show container 
    songsContainer.classList.remove("visiblity-hidden");
  }

  /**
 * Returns the element that has the ID attribute with the specified value.
 * @param {string} id - element ID
 * @return {object} DOM object associated with id.
 */
  function id(id: any) {
    return document.getElementById(id)!;
  }

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
  function qs(query: any) {
    return document.querySelector(query);
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
        <button id="selected-song" className="display-hidden">
          <p>Minami - Eternal Blue</p>
          <span className="material-symbols-rounded">
            close
          </span>
        </button>
      </section>
      <section id="song-results-container" className="visiblity-hidden">
        <div>
          <p>Artist</p>
          <p>Title</p>
          <p>Genre</p>
        </div>
        <hr></hr>
      </section>
    </div>
  )
};

export default SearchBar;