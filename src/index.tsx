// * index.tsx takes all of the components (Filter, Navbar, etc.) and renders
// * them in 'root', which will appear in '/public/index.html (see line 31)'

import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import Navbar from './components/Navbar';
import PlaylistReady from './components/PlaylistReady';
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
    <PlaylistReady/>
  </React.StrictMode>
);

