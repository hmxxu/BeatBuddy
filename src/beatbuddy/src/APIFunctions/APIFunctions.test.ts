import { returnGenres, returnSongFeatures, returnSongStats, searchSpotify, returnDummyRec, returnArtistStats, returnSpotifyRec, returnSongGenre } from "./ReturnSongStats";

test('returnSongStats does not return song data', async () => {
    // lowkey -- NIKI
    let response = await returnSongStats('5TTXEcfsYLh6fTarLaevTi');
    expect(typeof (response.name)).toBe('string');
});

test('returnSongFeatures gives incorrect feature list', async () => {
    // Fresh Static Snow -- Porter Robinson
    let response = await returnSongFeatures('1LikBIcmCec6zE64SHFcMK');
    // testing invariant song features for strict equality
    expect([response.id, response.time_signature, response.key])
        .toStrictEqual(['1LikBIcmCec6zE64SHFcMK', 4, 9]);
});

test('returnGenres does not give genre list', async () => {
    let response = await returnGenres();
    expect(response.genres).toBeTruthy(); // as long as it exists, no alterations required
});

test('returnArtistStats does not return artist data', async () => {
    // Porter Robinson
    let response = await returnArtistStats('3dz0NnIZhtKKeXZxLOxCam');
    expect(response.name).toBe('Porter Robinson');
});

test('returnDummyRec gives incorrect number of tracks', async () => {
    // NIKI
    let response = await returnDummyRec('2kxP07DLgs4xlWz8YHlvfh');
    expect(response.tracks.length).toBe(10);
});

test('returnSpotifyRec does not return expected object', async () => {
    let response = await returnSpotifyRec(1, ['3dz0NnIZhtKKeXZxLOxCam'], [], []);
    // response is not deterministic, so we only expect some response
    expect(response.tracks.length).toBe(1);
});

test('searchSpotify returns bad list of songs', async () =>{
    let response = await searchSpotify('fresh static snow');
    expect(response[0].title).toBe('Fresh Static Snow');
});

test('returnSongGenre does not give artist genres', async () => {
    // Porter Robinson
    let response = await returnSongGenre('3dz0NnIZhtKKeXZxLOxCam');
    // this shouldn't change 
    expect(response)
        .toStrictEqual(['complextro', 'edm', 'electro house', 'pop dance', 'progressive electro house']);
});

export {}