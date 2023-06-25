import SpotifyWebApi from 'spotify-web-api-node';
import { getSpotifyClient } from './spotifyAuth';
import { noSongPreviewMsg, updateProgressBar } from '../../../components/GeneratedPlaylist';
import { useEffect } from 'react';

let audio: HTMLAudioElement | undefined;
let playbackPosition: number | undefined;

const tracksWithoutPreview: Set<string> = new Set();

export async function playSong(trackId: string) {
  try {
    if (tracksWithoutPreview.has(trackId)) {
      noSongPreviewMsg();
      return Promise.resolve();
    }

    const spotifyClient: SpotifyWebApi = await getSpotifyClient();

    // Retrieve the preview URL for the track
    const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
      headers: {
        Authorization: `Bearer ${spotifyClient.getAccessToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to retrieve track data: ${response.status} ${response.statusText}`);
    }


    //!!! Volume
    const volume: number = 10;
    fetch(`https://api.spotify.com/v1/me/player/volume?volume_percent=${volume}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${spotifyClient.getAccessToken() }`
      },
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('PUT request failed');
      }
    })
    .then(volume => {
      console.log('PUT request successful:', volume);
    })
    .catch(error => {
      console.error('Error making PUT request:', error);
    });
    //!!!


    const track = await response.json();
    const previewUrl = track.preview_url;

    if (!previewUrl) {
      tracksWithoutPreview.add(trackId);
      noSongPreviewMsg();
      return Promise.resolve();
    }

    if (audio && !audio.paused) {
      // Pause the currently playing audio if any
      pauseSong();
    } else {
      audio = new Audio(previewUrl);

      // Set the playback position if available
      if (playbackPosition !== undefined) {
        audio.currentTime = playbackPosition;
      }

      // Event listener to update the progress bar as the song plays
      audio.addEventListener('timeupdate', () => {
        updateProgressBar(audio);
      });

      audio.play();
    }

    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
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