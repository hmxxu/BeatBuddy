/**
 * Tests that necessary environment variables are all set. These are
 * essential to running the web app on local, plus testing with Jest
 * on npm. If your other tests are unexpectedly failing, you should
 * check this first.
 */

require('dotenv').config();

describe('Test environment variables are set', () => {
    test('environment: CLIENT_ID is not set', () => {
        expect(typeof process.env.REACT_APP_SPOTIFY_CLIENT_ID).toBe('string');
    });

    test('environment: CLIENT_SECRET is not set', () => {
        expect(typeof process.env.REACT_APP_SPOTIFY_CLIENT_SECRET).toBe('string');
    });

    test('environment: REDIRECT_URI is not set', () => {
        expect(typeof process.env.REACT_APP_SPOTIFY_REDIRECT_URI).toBe('string');
    });

    test('environment: STAGE is not set', () => {
        expect(typeof process.env.REACT_APP_STAGE).toBe('string');
    });
});