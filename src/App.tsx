// * App.tsx is a starter file from Reac - we can remove this later

import React from 'react';
import logo from './images/logo.svg';
import minami from './images/minami.jpg';
import './styles/App.css';

function App(props: any) {
  // props is an Object
  console.log(props);
  let subject = props.subject;
  return (
    <div className="App">
      <header className="App-header">
        <img src={minami} className="App-logo" alt="logo" />
        <p>
          Hello {subject}!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
