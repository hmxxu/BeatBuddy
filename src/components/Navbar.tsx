import React from 'react';
import logo from '../images/beatbuddy-logo.svg';
import logoSmall from '../images/beatbuddy-small-logo.svg';

function Navbar() {
  return(
    <header>
      <img src={logoSmall} alt='BeatBuddy logo' id='beatbuddy-logo-small'></img>
    </header>
  )
};

export default Navbar;