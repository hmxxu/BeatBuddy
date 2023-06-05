# BeatBuddy
BeatBuddy is an app that tailors recommendations much more closely to your preferences, by analyzing specific attributes of a song *you choose*, and giving results as similar as possible. Here's some key features:
* Search spotify for a song
* Generate playlists based on a given song
* Choose a specific mood for the generated playlist
* View songs' audio features in the generated playlist

# Table of Contents
1. [User Manual](#user-manual)
    1. [Mini guide](#mini-user-steps-guide)
    2. [Features in progress](#features-in-progress)
    3. [Known bugs](#known-bugs)
    4. [Reporting new bugs](#how-to-report-bugs)
2. [For Developers](#for-developers)
    1. [Repository structure](#in-this-repository)
    2. [Steps to build](#steps-to-build)
        1. [Dependencies](#dependencies)
        2. [Steps](#steps)
    3. [Testing](#testing)
        1. [Running tests locally](#running-tests-on-your-local-machine)
        2. [Adding tests](#adding-tests)
        3. [Workflows](#workflows)
    4. [Detailed features for developers](#features-available-detailed-for-developers)


## User Manual 

Important: We are still waiting for Spotify to approve our API quota extension request. As a result, only whitelisted users are able to use the full functionality of the app. To try out the app with full access, please use our demo account when clicking on the "login for full access" button:

Email: clamshell991@gmail.com
Password: 3AM6ztH+wn429m

Try out BeatBuddy at https://hmxxu.github.io/BeatBuddy/! No installation or set up needed.

BeatBuddy offers a new way to discover songs on Spotify. Our unique recommendation algorithm utilizes the song's audio features (ex. energy, danceability, acousticness, etc.) to build a playlist of aurally similar songs! Furthermore, users can customize the playlist by filtering based on the decade (ex. 90's songs only) and genre (ex. Bossanova only) and add the generated playlist to their Spotify account. 

After generating a playlist, you can listen to it on BeatBuddy and view stats about the currently playing song's audio features.

Come try find new music in a new way today!

### Mini user steps guide
When you enter the website, you will see the search bar:
![image](https://github.com/hmxxu/BeatBuddy/assets/95561288/f68b6ce3-bb18-4000-a17a-b295343d584f)

Simply begin by entering a song, and clicking search. Once you've selected a song by clicking on it, it will be indicated in the search bar. Then select any mood:
![image](https://github.com/hmxxu/BeatBuddy/assets/95561288/e81b67cb-f82d-4ad0-b625-7ffe69b47b81)

And click "Generate my playlist":
![image](https://github.com/hmxxu/BeatBuddy/assets/95561288/5b5746f7-6cec-4d45-8ddd-e7a5ffb86468)

And you will now see a set of recommendations based on the song you chose:
![image](https://github.com/hmxxu/BeatBuddy/assets/95561288/bc8725e8-5bcd-40fc-9f0c-b646fd349969)

Simply click through them to see their properties and listen to previews, and click the "Save to Spotify" button to save the playlist to your account!


### Features in Progress

Currently, we are working on: 
 * The recommendation algorithm
 * Integration of the filters with the recommendation algorithm
 * On-site player for Spotify music 

### Known bugs
 * Spotify login, "Add to Spotify" button, and playback button do not work as we don't have an extended usage quota from Spotify. Contact a team member to be added manually to the Spotify Developer Dashboard to try out these features.

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

## Steps to build
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
  REACT_APP_SPOTIFY_CLIENT_ID=de37dcdd9bfa44258d5a86f4808e0567
  REACT_APP_SPOTIFY_CLIENT_SECRET=fa92f7b77ffa4c2dacc157ac9cf606df
  REACT_APP_SPOTIFY_REDIRECT_URI=http://localhost:3000/BeatBuddy/
  REACT_APP_STAGE=production
  ```
Provided is a set of dummy credentials for a Spotify web app, but you can use your own `id` and `secret` if you would like[^2].

5. Run `npm start`. This implicitly calls `react-scripts start`, which generates the necessary files to start a React app in development mode. It will also start an internal server hosting the webpage, which by default is located at `https://localhost:3000/`. While in development mode, any changes you make to a file (triggered by `Ctrl + S` or `^S`) will hot-reload the live page, so there is (usually[^3]) no need to restart the server while editing code.

Current primary interfacing functions:
* `returnSongStats` Rakes the Spotify-assigned `id` of a song and returns relevant stats.
* `returnDummyRec` Uses Spotify-assigned `id` of an artist to return a set of 10 recommendations from the artist. For testing purposes only.
* `getRecommendations` Cleans up song data and returns recommendations after combing through Spotify's recommendations (not yet working).

## Testing
### Running tests on your local machine
Simply make sure your `.env` file is set, and use `npm run jest` to run all unit tests. Note that these can take a while, as they often will make calls to the Spotify API.


### Adding tests
When adding more tests, simply create a file ending in `.test.ts`. BeatBuddy is tested using the Jest[^4] testing framework, and the preference for file structure is that tests are placed directly next to the unit they are testing. For example, suppose you have the following directory structure:
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
Similarly, you can specify the workflow to run more or different commands by editing the `run` section of `main.yml`[^5].

### Features available (detailed for developers)
* Search bar: you are able to input a song and query the public Spotify API for certain songs (bugged due to token issue)
* Song selection: after searching, you can click on a song to select it for later
* (some) Playlist customization features: there is a section on the site allowing you to choose specific features to emphasize in your playlist, including time period and genre
* Save to Spotify: users are able to log into Spotify, authenticate from this website, and are automatically redirected back into our site


[^1]: This is a dependency issue involving `ts-jest` and `babel-jest`. We are in the process of fixing dependencies. Other installs may not work as well, so use `--force` in any instance this occurs.
[^2]: Refer to the Spotify API [getting started](https://developer.spotify.com/documentation/web-api/tutorials/getting-started) page.
[^3]: In some situations, if you're encountering issues, restarting the server entirely may fix your issues. One common occurrence of this is setting your `.env` file while the server is active.
[^4]: Refer to the [Jest documentation](https://jestjs.io/docs/getting-started) for information on how to write tests for TypeScript in Jest.
[^5]: You can find the documentation for Workflow syntax [here](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions).

