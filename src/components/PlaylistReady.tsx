import React from 'react';
import GeneratedPlaylist from './GeneratedPlaylist';
import SearchBar from './SearchBar';
import { hideGenerateButton, hideMoodContainer, hideSearchContainer, closeModal, id, qs, showGenerateButton, showPlaylistContainer, hideWebsiteIntro, showWebsiteIntro } from '../utils';
import { useState } from 'react';
import { SearchResult } from '../utils';
import MoodButtons from './MoodButtons';
import { Mood, moodRec } from '../beatbuddy/src/recommendation/RecommendSongs';
import logo_large from '../images/beatbuddy-logo-large.svg';
import spotify_icon from '../images/spotify-icon.png';

function PlaylistReady() {

  // data gathered from SearchBar
  const [songId, setSongId] = useState("");

  // data gathered from SearchBar
  const [artistId, setArtistId] = useState("");

  // Data gathered from mood buttons
  const [mood, setMood] = useState(Mood.ANY);

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
   * Upon retrying with new song btn clicked, hide song-selected of previous search
   */
  const resetSearchBar = () => {
    id("selected-song").classList.add("hidden");
    let songInput = id("song-search") as HTMLInputElement;
    songInput.value = "";
    songInput.disabled = false;
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

      {/* Website Intro */}
      <div id="website-intro">
        <object data={logo_large} type="image/svg+xml" aria-labelledby="BeatBuddy logo" id="beatbuddy-home"></object>
        <h1 id="beatbuddy-desc" className="regular">BeatBuddy crafts personalized playlists that perfectly match your unique music taste!</h1>
        <button id="login-to-spotify" className="spotify-theme">
          Login for full access
          <img src={spotify_icon} alt="Spotify icon" id="login-to-spotify-icon"></img>
        </button>
        <p id="try-text">Don’t have Spotify? <u className="pointer" onClick={hideWebsiteIntro}>Try without full access</u></p>
      </div>

      <dialog data-modal className="modal">
        <p className="h-modal" id="success-text">Your playlist has been<br/>
          saved to Spotify 🎉</p>
        <p className="h-modal hidden" id="error-text">An error occurred.<br/>
          Your playlist could not be saved.</p>
        <button data-close-modal className="h-modal spotify-theme" onClick={closeModal}>Okay</button>
      </dialog>
      <SearchBar setIds={ getIds } />
      <MoodButtons setMood={ getMood } />

      <div id='generateReady' className='hidden'>
          <h2>That's it! Your playlist is now ready.</h2>
          <button id="generate-playlist-btn" onClick={generateRec}>Generate my playlist</button>
      </div>
      <GeneratedPlaylist viewState={ playlistViewState } recArray={ recData } hideSongSelected={ resetSearchBar } />
    </div>
  )
};

export default PlaylistReady;