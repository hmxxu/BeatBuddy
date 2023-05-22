// Mood buttons
import React from 'react';
import '../styles/moodButtons.css';
import { id, qs } from '../utils';

function MoodButtons(props: any) {

  return (
    <section className="mood-container hidden">
      <h2>Pick a playlist mood!</h2>
      <div id="mood-btns-container" className="flex">
        <button onClick={props.setMood}>Any</button>
        <button onClick={props.setMood}>Workout</button>
        <button onClick={props.setMood}>Sad</button>
        <button onClick={props.setMood}>Happy</button>
        <button onClick={props.setMood}>Chill</button>
      </div>
    </section>
  );
}

export default MoodButtons;
