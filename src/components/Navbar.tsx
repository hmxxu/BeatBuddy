import '../styles/navbar.css';

import React from 'react';
import logo_large from '../images/beatbuddy-logo-large.png';
import logo_small from '../images/beatbuddy-logo-small.svg';
import logout_btn from '../images/logout-btn.png';
import { clearAccessToken } from '../beatbuddy/src/spotify/tokenCookies';

function Navbar() {
  return(
    <header>
      <a href="/BeatBuddy">
        <img src={logo_large} alt='BeatBuddy logo' id='navbar-logo'></img>
      </a>
      <button className="logout-container" onClick={clearAccessToken}>
        <img src={logout_btn} alt='Logout' id='logout-icon'></img>
        <span id='logout-txt'>Logout</span>
      </button>
    </header>
  )
};

export default Navbar;