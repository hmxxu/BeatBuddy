# Setting up the back-end for development
Dependencies: 
- NodeJS v16+
- `npm` v9+

Steps to build:
1. Run `npm install` (if this throws errors, use `npm install --force` instead[^1]).
2. Put a `.env` file in the root directory of this project. If you have freshly cloned the project, this would be your top-level `BeatBuddy/` folder.
3. In that `.env` file, add two environment variables, `REACT_APP_SPOTIFY_CLIENT_ID` and `REACT_APP_SPOTIFY_CLIENT_SECRET`, like so:
  ```
  REACT_APP_SPOTIFY_CLIENT_ID=<client id>
  REACT_APP_SPOTIFY_CLIENT_SECRET=<client secret>
  ```
You can use your own `id` and `secret` if you would like[^2].

4. Run tests using `npm run jest` (these tests are failing for the moment).
5. Use `npm start` to start the internal server and run the website, by default on `http://localhost:3000/`.

Current primary interfacing functions:
* `returnSongStats` Rakes the Spotify-assigned `id` of a song and returns relevant stats.
* `returnDummyRec` Uses Spotify-assigned `id` of an artist to return a set of 10 recommendations from the artist. For testing purposes only.
* `getRecommendations` Cleans up song data and returns recommendations after combing through Spotify's recommendations (not yet working).

[^1]: This is a dependency issue involving `ts-jest` and `babel-jest`. We are in the process of fixing dependencies. Other installs may not work as well, so use `--force` in any instance this occurs.
[^2]: Refer to the Spotify API [getting started](https://developer.spotify.com/documentation/web-api/tutorials/getting-started) page.
