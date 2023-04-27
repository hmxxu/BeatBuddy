// * index.tsx takes all of the components (Filter, Navbar, etc.) and renders
// * them in 'root', which will appear in '/public/index.html (see line 31)'

import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import Navbar from './components/Navbar';
import Filter from './components/Filter';
import SearchBar from './components/SearchBar';
import PlaylistReady from './components/PlaylistReady';
import GeneratedPlaylist from './components/GeneratedPlaylist';

const root = ReactDOM.createRoot(document.getElementById('root')!);
// prop example: <App subject="Candiceeeeeee"/>
root.render(
  <React.StrictMode>
    <Navbar/>
    <SearchBar/>
    <div className="accordion">
      <label htmlFor="customize">Customize your playlist</label>
      <input type="checkbox" name="accordion" id="first"/>
      {/* <h4>Use our filters to customize your recommended playlist.</h4> */}
      <div id="two-filter">
        <Filter key="language-filter" type="language-filter" />
        <Filter key="genre-filter" type="genre-filter" />
      </div>
    </div>

    <PlaylistReady/>
    <GeneratedPlaylist/>
  </React.StrictMode>
);
