import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Navbar from './Navbar';
import Filter from './Filter';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App subject="Candiceeeeeee"/>
    <Navbar/>
    <Filter/>
  </React.StrictMode>
);
