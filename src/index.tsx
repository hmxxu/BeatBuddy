// * index.tsx takes all of the components (Filter, Navbar, etc.) and renders
// * them in 'root', which will appear in '/public/index.html (see line 31)'

import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import Navbar from './components/Navbar';
import Filter from './components/Filter';
import SearchBar from './components/SearchBar';
import PlaylistReady from './components/PlaylistReady';
import GeneratedPlaylist from './components/GeneratedPlaylist';
import accordion_icon from './images/accordion-close.png';
import { id, qs } from './utils';

const root = ReactDOM.createRoot(document.getElementById('root')!);
// prop example: <App subject="Candiceeeeeee"/>


function delayOverflow() {
  let checkbox = id('customize-box') as HTMLInputElement;
  if (checkbox.checked) {
    console.log('checkbox is checked');
    setTimeout(() => {
      // id('two-filter').classList.add('overflow-visible');
      id('two-filter').style.overflow = "visible";
    }, 400);
  } else {
    id('two-filter').style.overflow = "hidden";
  }
}

root.render(
  <React.StrictMode>
    <Navbar/>
    <SearchBar/>
    <div className="accordion">
      {/* <span className="customize-text h2 bold">Customize your playlist</span> */}
      <input type="checkbox" name="accordion" id="customize-box" onClick={delayOverflow} />
      <label htmlFor="customize-box" className="customize-label h2 bold">
        <span className="customize-text h2 bold">Customize your playlist</span>
        <img src={accordion_icon} alt="accordion-close" className="accordion-icon"></img>
      </label>
      <h4>Use our filters to customize your recommended playlist.</h4>
      <div id="two-filter">
        <Filter content="Time Period" key="language-filter" type="language-filter" />
        <Filter content="Genre" key="genre-filter" type="genre-filter" />
      </div>
    </div>

    <PlaylistReady/>
    <GeneratedPlaylist/>
  </React.StrictMode>
);

