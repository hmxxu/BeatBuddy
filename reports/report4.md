# Report 4

## Team report (status update for your TA, including an agenda for the project meeting)

### report on progress and issues: what you did, what worked, what you learned, where you had trouble, and where you are stuck.

Last week's goals:
 * Finish a MVP for alpha release
 * Have frontend and backend work together in more detail, make more backend API functions
 * Integrate `axios` into the project in place of `fetch`, should allow testing to work

Progress:
 * Frontend now recommends songs based on selected song that was searched
 * Frontend's generated playlist has color responsive feature
 * More backend function created --> mood algorithms
 * MVP finished
 * User testing carried out and feedback is being acted on

Trouble:
 * Spotify web player access token expires every hour, hard to share access tokens.
 * Player on website still a work in progress
 *

Stuck:
 * Filter integration with the recommendation algorithm

### outline your plans and goals for the following week (higher level)

Next week:
 * Incorporate filters into algorithm
 * Finetune recommendation algorithm
 * continue to improve frontend intuitiveness based on user feedback
 * Get player in BeatBuddy working

## Contributions of individual team members.

### report on progress and issues: what you did, what worked, what you learned, where you had trouble, and where you are stuck.

Pu
 * Added and fixed bugs for color responsive generated playlist design
 * Wrote user testing script


Pahn
 * Added desktop centered two column format for generated playlist
 * Intergrated frontend and backend to allow for working recommendations based on selected song
 * Wrote user testing script

Jonathan
 * Expand test coverage to about 2/3rds of backend functionality
 * Added more details to developer documentation

Adrian + HaoMing
 * Got stuck because existing function `returnAudioFeatures` only return audio feature for a singlar track
 * Made a version of `returnAudioFeatures` that works for a mutiple tracks
 * Made function to display average audio feature of a given playlist
 * Made mood based algorithms based on average trends on moods


Tapan
 * Carried out user testing
 * Wrote user testing script

### outline your plans and goals for the following week (per person)

Pu
 * Work on redesigning frontend to be more intuitive for users

Pahn
 * Work on redesigning frontend to be more intuitive for users

Jonathan
 * Get test coverage over almost all of backend function

Adrian + HaoMing
 * Do research for recommendation algorithm / improve mood-based algorithm by increase the pool of playlist for each mood
 * Do more research on which audio features matter for each mood
 * Make testing for newly created functions if needed
 * Create any backend functions for frontend if needed
 * Help with player in BeatBuddy if needed

Tapan
 * Work on incorporating the spotify player into the frontend
