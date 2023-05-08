import React, { useState } from 'react';

import '../styles/songSearch.css';
import SongResult from './SongResult';
import { id, qs } from '../utils';

import { searchSpotify } from '../beatbuddy/src/APIFunctions/ReturnSongStats';

class SearchResult {
  artist: string;
  title: string;
  id: string;
  imgUrl: string;

  constructor(artist: string, title: string, id: string, imgUrl: string) {
      this.artist = artist;
      this.title = title;
      this.id = id;
      this.imgUrl = imgUrl;
  }
}

function SearchBar() {

  window.addEventListener("load", init);

  const [selectedState, setSelectedState] = useState("hidden");
  const [selectedDisplay, setSelectedDisplay] = useState("Miku - Miku");

  // Array of songs
  const initialSongs : Array<Object> = [];
  const [currSongsState, setSongsState] = useState(initialSongs);

  function init() {
    // search button
    qs("input + button").addEventListener("click", searchSongs);
    qs("input").addEventListener("keyup", (e : any) => {
      if (e.key === 'Enter' || e.keyCode === 13) {
        searchSongs();
      }
    })

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
  async function searchSongs() {
    // get user input
    let searchInput : HTMLInputElement = id('song-search') as HTMLInputElement;
    let userInput : string = searchInput.value;
    
    // Get songs from backend
    let songs : SearchResult[] = await searchSpotify(userInput);

    setSongsState(songs);

    // show container
    id("search-results").classList.remove("visibility-hidden");
  }

  /**
   * Updates the selected song when song result is clicked
   * @param {Array<Array<string>>} song - Song array arranged like [artist, song, genre]
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