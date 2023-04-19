import React from 'react';
// ! (4/18/23) Looks like React wont accept SVG files - Pu
import logo from './logo.svg';
import minami from './minami.jpg';
import './App.css';

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
