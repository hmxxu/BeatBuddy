import SpotifyWebApi from 'spotify-web-api-node';
import { getSpotifyClient } from './spotifyAuth';
import { noSongPreviewMsg, updateProgressBar } from '../../../components/GeneratedPlaylist';


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
      const errorDetail = await response.json();
      console.error('Error fetching track:', errorDetail);
      throw new Error(`Failed to retrieve track data: ${response.status} ${response.statusText}`);
    }

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

      audio.addEventListener('ended', () => {
        // * Custom event listener for when audio has ended
        // * --> to be used with the react components
        const event = new CustomEvent('audioEnded', {detail: { action: true }});
        window.dispatchEvent(event);
      })

      audio.volume = 0.15;
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