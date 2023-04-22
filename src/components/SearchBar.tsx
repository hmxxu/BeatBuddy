import React from 'react';

import '../styles/songSearch.css';

function SearchBar() {
  return(
    <div>
      <label htmlFor="song-search"><h2>Pick a Song!</h2></label>
      <div id="song-search-wrapper">
        <input type="text" id="song-search" placeholder='Search a song... ' ></input>
        <button>
          <span className="material-symbols-rounded">
            search
          </span>
        </button>
      </div>
    </div>
  )
};

export default SearchBar;