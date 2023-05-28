import React from 'react';
import logoLarge from '../images/beatbuddy-logo-large.png';
import logoSmall from '../images/beatbuddy-logo-small.svg';

function Navbar() {
  return(
    <header>
      <img src={logoLarge} alt='BeatBuddy logo' id='beatbuddy-logo'></img>
    </header>
  )
};

export default Navbar;