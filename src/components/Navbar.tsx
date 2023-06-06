import '../styles/navbar.css';

import React from 'react';
import { useEffect } from 'react';
import logo_large from '../images/beatbuddy-logo-large.png';
import logo_small from '../images/beatbuddy-logo-small.svg';
import logout_btn from '../images/logout-btn.png';
import login_btn from '../images/login-btn.png';
import { loginInFromFrontPage } from '../utils';
import { isLoggedIn } from '../../src/beatbuddy/src/spotify/Callback';
import { getAccessTokenFromCookie, clearAccessToken } from '../beatbuddy/src/spotify/tokenCookies';

function Navbar() {
  // let isLoggedIn: boolean = false;

  // useEffect(() => {
  //   const handleBeforeUnload = () => {
  //     checkforLogin();
  //   }
  //   window.addEventListener('beforeunload', handleBeforeUnload);
  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload)
  //   }
  // }, []);

  // const checkforLogin = () => {
  //   const token = getAccessTokenFromCookie();
  //   if (token) {
  //     isLoggedIn = true;
  //     console.log('log in is true');
  //   } else {
  //     isLoggedIn = false;
  //     console.log('log in is false');
  //   }
  // }
  console.log('navbar');
  console.log('isLoggedIn = ' + isLoggedIn);

  return(
    <header>
      <a href="/BeatBuddy">
        <img src={logo_large} alt='BeatBuddy logo' id='navbar-logo'></img>
      </a>
      {isLoggedIn ?
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