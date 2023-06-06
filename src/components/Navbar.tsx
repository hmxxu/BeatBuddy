import '../styles/navbar.css';

import React from 'react';
import { useState, useEffect } from 'react';
import logo_large from '../images/beatbuddy-logo-large.png';
import logo_small from '../images/beatbuddy-logo-small.svg';
import logout_btn from '../images/logout-btn.png';
import login_btn from '../images/login-btn.png';
import { isLoggedIn, loginInFromFrontPage } from '../utils';
import { getAccessTokenFromCookie, clearAccessToken } from '../beatbuddy/src/spotify/tokenCookies';

function Navbar() {
  const [cookieCleared, setCookieCleared] = useState(false);

  useEffect(() => {
    const checkCookieCleared = () => {
      if (!document.cookie.includes('spotify_access_token')) {
        setCookieCleared(true);
      }
    };
    checkCookieCleared();
    // check if cookie is cleared every 1 second
    setTimeout(checkCookieCleared, 1000);
  }, [])

  return(
    <header>
      <a href="/BeatBuddy">
        <img src={logo_large} alt='BeatBuddy logo' id='navbar-logo'></img>
      </a>
      {!cookieCleared ?
        <button className="logout-container" onClick={clearAccessToken}>
          <img src={logout_btn} alt='Logout' id='logout-icon'></img>
          <span id='logout-txt'>Logout</span>
        </button>
      :
        <button className="logout-container" onClick={loginInFromFrontPage}>
          <img src={login_btn} alt='Logout' id='logout-icon'></img>
          <span id='logout-txt'>Login</span>
        </button>
      }

    </header>
  )
};

export default Navbar;