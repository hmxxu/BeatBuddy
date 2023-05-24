// * index.tsx takes all of the components (Filter, Navbar, etc.) and renders
// * them in 'root', which will appear in '/public/index.html (see line 31)'

import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import Navbar from './components/Navbar';
import PlaylistReady from './components/PlaylistReady';
// import PlaylistButton from './components/PlaylistButton';
import { Callback } from './Callback';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <Navbar/>
    <PlaylistReady/>
    <Router>
      <Routes>
      <Route path="/BeatBuddy/" element={<Callback />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

