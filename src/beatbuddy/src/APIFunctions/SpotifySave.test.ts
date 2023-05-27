import { savePlaylistToSpotify } from "./saveToSpotify";

test('save to Spotify throws error', async () => {
    // No token cookie saved, so it should throw
    await expect(savePlaylistToSpotify('name', []))
        .rejects
        .toThrow(Error);
});