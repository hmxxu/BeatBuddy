# BeatBuddy
BeatBuddy is an app that tailors recommendations much more closely to your preferences, by analyzing specific attributes of a song *you choose*, and giving results as similar as possible. Here's some key features:
* Generate playlists based on a given song
	* Automatically generated based on a given song
	* Personalized specifically for the song that you choose
* Choose specific languages for the generated songs
* The given songs are chosen to be as similar as possible
	* Traits such as tempo, rhythm, pitch, melody, etc. are considered

## In this repository
`/public` and `/src` is for the front-facing website, and contains all code for visuals and website display.

`/src/beatbuddy` is where all back-end code for Spotify auth and recommendations are stored.

# Setting up the back-end for development
Dependencies: 
- NodeJS v16+
- `npm` v9+

Steps to build:
1. Run `npm install` (if this throws errors, use `npm install --force` instead[^1]).
2. Put a `.env` file in the root directory of this project. If you have freshly cloned the project, this would be your top-level `BeatBuddy/` folder.
3. In that `.env` file, add two environment variables, `REACT_APP_SPOTIFY_CLIENT_ID` and `REACT_APP_SPOTIFY_CLIENT_SECRET`, like so:
  ```.env
  REACT_APP_SPOTIFY_CLIENT_ID=<client id>
  REACT_APP_SPOTIFY_CLIENT_SECRET=<client secret>
  REACT_APP_STAGE=production
  ```
You can use your own `id` and `secret` if you would like[^2].

4. Run tests using `npm run jest` (these tests are failing for the moment).
5. Use `npm start` to start the internal server and run the website, by default on `http://localhost:3000/`.

Current primary interfacing functions:
* `returnSongStats` Rakes the Spotify-assigned `id` of a song and returns relevant stats.
* `returnDummyRec` Uses Spotify-assigned `id` of an artist to return a set of 10 recommendations from the artist. For testing purposes only.
* `getRecommendations` Cleans up song data and returns recommendations after combing through Spotify's recommendations (not yet working).

# Testing
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
Similarly, you can specify the workflow to run more or different commands by editing the `run` section of `main.yml`[^3]. 
  
When adding more tests, simply create a file ending in `.test.ts`. BeatBuddy is tested using the `Jest` testing framework, and the preference for file structure is that tests are placed directly next to the unit they are testing.

*-content subject to change-*

[^1]: This is a dependency issue involving `ts-jest` and `babel-jest`. We are in the process of fixing dependencies. Other installs may not work as well, so use `--force` in any instance this occurs.
[^2]: Refer to the Spotify API [getting started](https://developer.spotify.com/documentation/web-api/tutorials/getting-started) page.
[^3]: You can find the documentation for Workflow syntax [here](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)

