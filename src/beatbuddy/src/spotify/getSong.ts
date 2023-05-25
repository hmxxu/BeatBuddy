import SpotifyWebApi from 'spotify-web-api-node';
import { getSpotifyClient } from './spotifyAuth';
// import axios from 'axios';
import { noSongPreviewMsg, updateProgressBar } from '../../../components/GeneratedPlaylist';

let audio: HTMLAudioElement | undefined;
let playbackPosition: number | undefined;

const tracksWithoutPreview: Set<string> = new Set();

export async function playSong(trackId: string) {


    return Promise.resolve();

}

export function pauseSong() {
  if (audio && !audio.paused) {
    audio.pause();

    // Store the current playback position
    playbackPosition = audio.currentTime;
  }
}

export function stopSong() {
  if (audio) {
    audio.pause();

    // Store the current playback position
    playbackPosition = 0;
  }
}