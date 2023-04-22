// * index.tsx takes all of the components (Filter, Navbar, etc.) and renders
// * them in 'root', which will appear in '/public/index.html (see line 31)'

import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import Navbar from './components/Navbar';
import Filter from './components/Filter';
import SearchBar from './components/SearchBar';

const root = ReactDOM.createRoot(document.getElementById('root')!);
// prop example: <App subject="Candiceeeeeee"/>
root.render(
  <React.StrictMode>
    <Navbar/>
    <SearchBar/>
    <Filter/>
  </React.StrictMode>
);
