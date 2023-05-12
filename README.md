# BeatBuddy
BeatBuddy is an app that tailors recommendations much more closely to your preferences, by analyzing specific attributes of a song *you choose*, and giving results as similar as possible. Here's some key features:
* Generate playlists based on a given song
	* Automatically generated based on a given song
	* Personalized specifically for the song that you choose
* Choose specific languages for the generated songs
* The given songs are chosen to be as similar as possible
	* Traits such as tempo, rhythm, pitch, melody, etc. are considered

Our website can be found at https://hmxxu.github.io/BeatBuddy/!

## In this repository
`/public` and `/src` is for the front-facing website, and contains all code for visuals and website display.

`/src/beatbuddy` is where all back-end code for Spotify auth and recommendations are stored.

# Steps to build
### Dependencies: 
- NodeJS v16+
- `npm` v9+

Please follow this [guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to install NodeJS and `npm` on the OS of your choice. For direct download and install of NodeJS and `npm` from the source, click [here](https://nodejs.org/en/download).

### Steps:
1. To clone the project, use: 
  ```shell
  git clone git@github.com:hmxxu/BeatBuddy.git
  cd BeatBuddy
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
  
When adding more tests, simply create a file ending in `.test.ts`. BeatBuddy is tested using the `Jest` testing framework, and the preference for file structure is that tests are placed directly next to the unit they are testing.

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

