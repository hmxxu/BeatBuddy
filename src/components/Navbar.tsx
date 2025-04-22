import '../styles/navbar.css';

import React from 'react';
import { useState, useEffect } from 'react';
import logo_large from '../images/beatbuddy-logo-large.svg';
import logout_btn from '../images/logout-btn.png';
import login_btn from '../images/login-btn.png';
import { loginInFromFrontPage, hideLoginContainer, showSearchContainer } from '../utils';
import { clearToken, refreshTokenIfNeeded } from '../beatbuddy/src/spotify/tokenCookies';

function Navbar() {
  const [cookieCleared, setCookieCleared] = useState(false);

  useEffect(() => {
    refreshTokenIfNeeded();
    const checkCookieCleared = () => {
      if (!document.cookie.includes('spotify_access_token')) {
        // console.log('cookie is cleared')
        setCookieCleared(true);
      } else {
        // console.log('cookie is not cleared')
        setCookieCleared(false);
      }
    };
    checkCookieCleared();
    // check if cookie is cleared every 0.5 second
    setTimeout(checkCookieCleared, 500);
  }, [])

  return(
    <header>
      <a href="/BeatBuddy">
        <img src={logo_large} alt='BeatBuddy logo' id='navbar-logo'></img>
      </a>
      {!cookieCleared ?
        <button className="logout-in-container" onClick={clearToken}>
          <img src={logout_btn} alt="" aria-hidden="true" id='logout-icon'></img>
          <span id='logout-txt'>Logout</span>
        </button>
      :
        <button className="logout-in-container" onClick={loginInFromFrontPage}>
          <img src={login_btn} alt="" aria-hidden="true" id='login-icon'></img>
          <span id='login-txt'>Login</span>
        </button>
      }

    </header>
  )
};

export default Navbar;