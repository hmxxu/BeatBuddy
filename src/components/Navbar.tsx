import React from 'react';
import logo_large from '../images/beatbuddy-logo-large.png';
import logo_small from '../images/beatbuddy-logo-small.svg';

function Navbar() {
  return(
    <header>
      <a href="/">
        <img src={logo_large} alt='BeatBuddy logo' id='navbar-logo'></img>
      </a>
    </header>
  )
};

export default Navbar;