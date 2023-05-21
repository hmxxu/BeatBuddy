// Mood buttons 
import React from 'react';
import '../styles/moodButtons.css';

function MoodButtons(props: any) {

  return (
    <section>
      <h2>Pick a playlist mood!</h2>
      <div id="mood-btns-container" className="flex">
        <button className='selected-mood'>Any</button>
        <button>Workout</button>
        <button>Sad</button>
        <button>Happy</button>
        <button>Chill</button>
      </div>
    </section>
  );
}

export default MoodButtons;
