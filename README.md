# BeatBuddy
BeatBuddy is an app that tailors recommendations much more closely to your preferences, by analyzing specific attributes of a song *you choose*, and giving results as similar as possible. Here's some key features:
* Generate playlists based on a given song
	* Automatically generated based on a given song
	* Personalized specifically for the song that you choose
* Choose specific languages for the generated songs
* The given songs are chosen to be as similar as possible
	* Traits such as tempo, rhythm, pitch, melody, etc. are considered

## User Manual

Try out BeatBuddy at https://hmxxu.github.io/BeatBuddy/! No installation or set up needed.

BeatBuddy offers a new way to discover songs on Spotify. Our unique recommendation algorithm utilizes the song's audio features (ex. energy, danceability, acousticness, etc.) to build a playlist of aurally similar songs! Furthermore, users can customize the playlist by filtering based on the decade (ex. 90's songs only) and genre (ex. Bossanova only) and add the generated playlist to their Spotify account. 

Come try find new music in a new way today!

### Features in Progress

Currently, we are working on: 
 * The recommendation algorithm
 * Integration of the filters with the recommendation algorithm
 * On-site player for Spotify music 

### Known bugs
 * Clicking on a song in the generated playlist may generate an incorrect background color (black) leading to readability issues
 * Search bar does not work

### How to report bugs
Before reporting a bug, confirm the bug appears on a new browser profile (ex. incognito browser). If it does not, it may be due to extension or personal setting interferences. You can still report this bug but please note this in the steps to reproduce. 

To submit an unlisted bug, post a GitHub issue with the following information: 
 * Bug title
 * Bug description outlining the expected results and the actual results
 * Precise steps to reproduce the bug
 * Operating System, browser, and browser version

# For Developers
## In this repository
`/public` and `/src` is for the front-facing website, and contains all code for visuals and website display.

`/src/beatbuddy` is where all back-end code for Spotify auth and recommendations are stored. The three components currently are `/spotify` for authentication, `/APIFunctions` for interfacing with the Spotify API, and `/recommendation` for algorithm-related functions.

# Steps to build
### Dependencies: 
- NodeJS v16+
- `npm` v9+

Please follow this [guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to install NodeJS and `npm` on the OS of your choice. For direct download and install of NodeJS and `npm` from the source, click [here](https://nodejs.org/en/download).

### Steps:
1. To clone the project, use: 
  ```shell
  # Download source code and switch into directory
  $ git clone git@github.com:hmxxu/BeatBuddy.git
  $ cd BeatBuddy
  ```
2. Run `npm install --force`[^1].
3. Put a `.env` file in the root directory of this project. If you have freshly cloned the project, this would be your top-level `BeatBuddy/` folder.
4. In that `.env` file, add the following four environment variables, like so:
  ```.env
  REACT_APP_SPOTIFY_CLIENT_ID=<client id>
  REACT_APP_SPOTIFY_CLIENT_SECRET=<client secret>
  REACT_APP_REDIRECT_URI=http://localhost:3000/BeatBuddy/
  REACT_APP_STAGE=production
  ```
You can use your own `id` and `secret` if you would like[^2].

5. Run `npm start`. This implicitly calls `react-scripts start`, which generates the necessary files to start a React app in development mode. It will also start an internal server hosting the webpage, which by default is located at `https://localhost:3000/`. While in development mode, any changes you make to a file (triggered by `Ctrl + S` or `^S`) will hot-reload the live page, so there is (usually[^3]) no need to restart the server while editing code.

Current primary interfacing functions:
* `returnSongStats` Rakes the Spotify-assigned `id` of a song and returns relevant stats.
* `returnDummyRec` Uses Spotify-assigned `id` of an artist to return a set of 10 recommendations from the artist. For testing purposes only.
* `getRecommendations` Cleans up song data and returns recommendations after combing through Spotify's recommendations (not yet working).

# Testing
### Running tests on your local machine
Simply make sure your `.env` file is set, and use `npm run jest` to run all unit tests. Note that these can take a while, as they often will make calls to the Spotify API.


### Adding tests
When adding more tests, simply create a file ending in `.test.ts`. BeatBuddy is tested using the `Jest` testing framework, and the preference for file structure is that tests are placed directly next to the unit they are testing. For example, suppose you have the following directory structure:
```
dir1/
├─ MyFunctions.ts
├─ MyClasses.ts
dir2/
├─ MyFile.ts
```
Then your test files should be placed like so:
```
dir1/
├─ MyFunctions.ts
├─ MyClasses.ts
├─ MyFunctions.test.ts
├─ MyClasses.test.ts
dir2/
├─ MyFile.ts
├─ MyFile.test.ts
```

### Workflows
A GitHub Actions workflow is set to run `npm install --force`, and then `npm run jest` every time a pull request or push is made to a certain branch. Currently, it only does this for the main branch. If you want to add CI/CD support on other branches, simply open the `main.yml` file in `/.github/workflows/` and edit the following sections:
  ```yml
  push:
    branches:
      - main
      - <branch name>
  pull_request:
    branches: 
      - main
      - <branch name>
  ```
Similarly, you can specify the workflow to run more or different commands by editing the `run` section of `main.yml`[^4].

*-content subject to change-*

# CURRENTLY WORKING FEATURES
* Search bar: you are able to input a song and query the public Spotify API for certain songs
* Song selection: after searching, you can click on a song to select it for later
* (some) Playlist customization features: there is a section on the site allowing you to choose specific features to emphasize in your playlist, including time period and genre
* Save to Spotify: users are able to log into Spotify, authenticate from this website, and are automatically redirected back into our site

[^1]: This is a dependency issue involving `ts-jest` and `babel-jest`. We are in the process of fixing dependencies. Other installs may not work as well, so use `--force` in any instance this occurs.
[^2]: Refer to the Spotify API [getting started](https://developer.spotify.com/documentation/web-api/tutorials/getting-started) page.
[^3]: In some situations, if you're encountering issues, restarting the server entirely may fix your issues. One common occurrence of this is setting your `.env` file while the server is active.
[^4]: You can find the documentation for Workflow syntax [here](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)

