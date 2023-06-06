import React from 'react';
import GeneratedPlaylist from './GeneratedPlaylist';
import SearchBar from './SearchBar';
import { hideGenerateButton, hideMoodContainer, hideSearchContainer, closeModal, id, qs, showGenerateButton, showPlaylistContainer, hideLoginContainer, hideWebsiteIntro, showSearchContainer} from '../utils';
import { useState } from 'react';
import { SearchResult } from '../utils';
import MoodButtons from './MoodButtons';
import { Mood, moodRec } from '../beatbuddy/src/recommendation/RecommendSongs';
import logo_large from '../images/beatbuddy-logo-large.svg';
import spotify_icon from '../images/spotify-icon.png';
import spotify_icon_official from '../images/spotify-icon-official.png';
import { authorizeWithSpotify } from '../beatbuddy/src/spotify/spotifyAuth';
import { getAccessTokenFromCookie } from '../beatbuddy/src/spotify/tokenCookies';
import { hasUserLoggedIn } from './GeneratedPlaylist';


function PlaylistReady() {

  // data gathered from SearchBar
  const [songId, setSongId] = useState("");

  // data from searchBar for title of generated playlist
  const [playlistName, setPlaylistName] = useState("");

  // data gathered from SearchBar
  const [artistId, setArtistId] = useState("");

  // Data gathered from mood buttons
  const [mood, setMood] = useState(Mood.ANY);

  // initial recommendations list to determine type
  const initialRecs: SearchResult[] = [];

  // reccomendation data, passed to GeneratedPlaylist. Output of recommendation algorithm
  const [recData, setRecData] = useState(initialRecs);

  // controls if user sees GeneratedPlaylist or not
  const [playlistViewState, setPlaylistViewState] = useState("hidden");

  const [modalMessage, setModalMessage] = useState("Error please try again");

  /**
   * Called when user selects a song from the searchbar
   * Gets the metadata from searchbar for the components downstream
   * @param {string} songData - id of song selected
   * @param {string} artistData - id of artist of song selected
   * @param {string} songTitle - title of song
   */
  const getIds = (songData: any, artistData: any, songTitle: string) => {
    setSongId(songData);
    setArtistId(artistData);
    setPlaylistName(songTitle + " Recommended Playlist - BeatBuddy");
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
    hideWebsiteIntro()

    // Shows the playlist
    showPlaylistContainer();

    try {
      // get recommendations based on selected song
      let data = await moodRec(mood, tracks_seed);
      // convert recommended songs to searchResult[]
      let recArray: SearchResult[] = [];
      // genre array is empty for now
      data.tracks.forEach((t) => {
        recArray.push(new SearchResult(t.artists[0].name, t.artists[0].id,
          t.name, t.id, [], t.album.images[1].url));
      })
      setRecData(recArray);
      setPlaylistViewState("");
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * WHEN a user logins from the landing page, redirect them to search page.
   */
  async function loginInFromFrontPage() {
    let accessCode = getAccessTokenFromCookie();
    if (accessCode !== null && accessCode != "undefined") {
      hideLoginContainer();
      showSearchContainer();
    } else {
      authorizeWithSpotify();
  }

  return (
    <div>
      {/* Website Intro */}
      <div id="website-intro">
        <object data={logo_large} type="image/svg+xml" aria-labelledby="BeatBuddy logo" id="beatbuddy-home"></object>
        <h1 id="beatbuddy-desc" className="regular">BeatBuddy crafts personalized playlists that perfectly match your unique music taste!</h1>
        <div id="login-container">
          <button id="login-to-spotify" className="spotify-theme" onClick={loginInFromFrontPage}>
            Login for full access
            <img src={spotify_icon} alt="Spotify icon" id="login-to-spotify-icon"></img>
          </button>
          <p id="try-text">Don’t have Spotify?&nbsp;
            <u className="pointer" onClick={() => {
              hideLoginContainer();
              showSearchContainer();
            }}>Try without full access</u>
          </p>
        </div>
      </div>

      <dialog data-modal className="modal">
        <p className="h-modal" id="modal-txt">{modalMessage}</p>
        {!hasUserLoggedIn() && (
          <button id="login-to-spotify" className="spotify-theme h-modal" onClick={() => loginInFromFrontPage()}>
            Login for full access
            <img src={spotify_icon} alt="Spotify icon" id="login-to-spotify-icon"></img>
          </button>
        )}
        <button data-close-modal className="h-modal spotify-theme" onClick={closeModal}>Okay</button>
      </dialog>
      <SearchBar setIds={getIds} />
      <MoodButtons setMood={getMood} />

      <div id='generateReady' className='hidden'>
        <h2>That's it! Your playlist is now ready.</h2>
        <button id="generate-playlist-btn" onClick={generateRec}>Generate my playlist</button>
      </div>
      <GeneratedPlaylist modalMessage={modalMessage} setModalMessage={setModalMessage} viewState={playlistViewState} recArray={recData} hideSongSelected={resetSearchBar} playlistName={playlistName} />
    </div>
  )
};

export default PlaylistReady;