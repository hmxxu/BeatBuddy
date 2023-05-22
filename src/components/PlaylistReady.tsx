import React from 'react';
import GeneratedPlaylist from './GeneratedPlaylist';
import SearchBar from './SearchBar';
import Filter from './Filter';
import { hideGenerateButton, hideMoodContainer, hideSearchContainer, id, qs, showGenerateButton, showPlaylistContainer } from '../utils';
import accordion_icon from '../images/accordion-close.png';
import { useState } from 'react';
import { SearchResult } from '../utils';
import MoodButtons from './MoodButtons';
import { moodRec } from '../beatbuddy/src/recommendation/RecommendSongs';

function PlaylistReady() {

  // data gathered from SearchBar
  const [songId, setSongId] = useState("");

  // data gathered from SearchBar
  const [artistId, setArtistId] = useState("");

  // Data gathered from mood buttons
  const [mood, setMood] = useState("");

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
    //document.querySelector('.accordion')!.classList.remove("hidden");
  }

  /**
   * Called when user clicks on mood button
   * @param {HTMLElement} event - button's event when clicked
   */
  const getMood = (event: any) => {

    // Makes generate button appear when user clicks on a mood
    showGenerateButton();

    setMood(event.target.textContent);
    if (qs(".selected-mood") != null) {
      qs(".selected-mood").classList.remove("selected-mood");
    }
    event.target.classList.add("selected-mood");
  }


  /**
   * generates Recommendates and displays it to the user by updating the state
   * The state is then passed down to the GeneratedPlaylist component
   */
  async function generateRec() {
    let artists_seed: string[] = [artistId];
    let genres_seed: string[] = [];
    let tracks_seed: string[] = [songId];

    // Hides everything else that's not the playlist
    hideSearchContainer();
    hideMoodContainer();
    hideGenerateButton();

    // Shows the playlist
    showPlaylistContainer();

    try {
      // get recommendations based on selected song
      console.log('mood in generateRec = ' + mood);
      let data = await moodRec(mood, tracks_seed);

      // convert recommended songs to searchResult[]
      let recArray : SearchResult[] = [];

      // genre array is empty for now
      data.tracks.forEach((t) => {
        recArray.push(new SearchResult(t.artists[0].name, t.artists[0].id,
          t.name, t.id, [], t.album.images[1].url));
      })

      setRecData(recArray);
      setPlaylistViewState("");
    } catch (err) {
      console.error(err)
    }
  }

  return(
    <div>
      <SearchBar setIds={ getIds } />
      {
      // <div className="accordion">
      //   {/* <span className="customize-text h2 bold">Customize your playlist</span> */}
      //   <input type="checkbox" name="accordion" id="customize-box" onClick={delayOverflow}/>
      //   <label htmlFor="customize-box" className="customize-label h2 bold">
      //     <span className="customize-text h2 bold">Customize your playlist</span>
      //     <img src={accordion_icon} alt="accordion-close" className="accordion-icon" onClick={showGenerate}></img>
      //   </label>
      //   <h4>Use our filters to customize your recommended playlist.</h4>
      //   <div id="two-filter">
      //     <Filter content="Time Period" key="language-filter" type="language-filter" childToParent={getDecadeArray}/>
      //     <Filter content="Genre" key="genre-filter" type="genre-filter" childToParent={getGenreArray}/>
      //   </div>
      // </div>
      }

      <MoodButtons setMood={ getMood } />

      <div id='generateReady' className='hidden'>
          <h2>That's it! Your playlist is now ready.</h2>
          <button id="generate-playlist-btn" onClick={generateRec}>Generate my playlist</button>
      </div>
      <GeneratedPlaylist viewState={ playlistViewState } recArray={ recData } />
    </div>
  )
};

export default PlaylistReady;