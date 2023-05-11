# Report 3

## Team report (status update for your TA, including an agenda for the project meeting)

### report on progress and issues: what you did, what worked, what you learned, where you had trouble, and where you are stuck.

Last week's goals:
 * Finish a MVP for alpha release
 * Have frontend and backend work together in more detail, make more backend API functions
 * Finish mobile responsive design
 * Integrate `axios` into the project in place of `fetch`, should allow testing to work

Progress:
 * Backend and frontend are now connected and interacting
 * Spotify authorization working
 * Figured out how to extract genres from Spotify (through artist instead of album)

Trouble:
 * Spotify web player access token expires every hour, hard to share access tokens.
 * 
 *

Stuck:
 * Spotify player is only for preminum members, see 1st trouble above
 * Spotify does not have language metadata per song, so the filtering song by language is dead

### outline your plans and goals for the following week (higher level)

Next week:
 * Finish a MVP for alpha release
 * Have frontend and backend work together in more detail, make more backend API functions
 * Finish mobile responsive design
 * Integrate `axios` into the project in place of `fetch`, should allow testing to work


## Contributions of individual team members.

### report on progress and issues: what you did, what worked, what you learned, where you had trouble, and where you are stuck.

Pu
 * Allow for filter search to filter both time period and genre
 * Connected the filter search with the Spotify API
 

Pahn
 * Restructured frontend to allow for data passing between components
 * Implemented frontend dynamics like song querying, player functionality, song features on click

Jonathan
 * Cleaned up repository structure: removed unneeded files and restored react-scripts
 * Configured conditional environments for testing vs. on web so CI/CD can run Jest tests

HaoMing
 * Made functions and a class to service the search bar
 * Edited previously made function as frontend requested

Adrian
 *
 *

Tapan
 * 
 *

### outline your plans and goals for the following week (per person)

Pu
 * Write and conduct usability testing (and use the results to make changes to the UI)
 * Figure out how to make Spotify web player work so we can play music on the site

Pahn
 * Write user testing script
 * Organize feedback and sort by priority
 * Incorporate feedback into frontend 

Jonathan
 * Expand test suite to cover more units
 * Potentially explore alternatives to fully custom recommendation algorithm

HaoMing
 * Create a lot more unit test for functions created
 * Help get Spotify songs to play on browser or research recommendation algorithm based on mood

Adrian
 *
 *

Tapan
 * 
 *
