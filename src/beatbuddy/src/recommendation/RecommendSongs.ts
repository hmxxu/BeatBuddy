import { returnMultipleSongFeatures, returnSpotifyRec } from "../APIFunctions/ReturnSongStats";
import { getAccessToken } from "./APIWrapper";
import SpotifyWebApi from 'spotify-web-api-node';
import { getSpotifyClient } from '../spotify/spotifyAuth';

function getReccomendations(): SongRec[] {
    // TODO: actually get song recommendations
    let recs: SongRec[] = [];
    recs.push(new SongRec("cool song title"));
    return recs;
}

class SongRec {
    // TODO: add more necessary info
    title: string;

    constructor(title: string) {
        this.title = title;
    }
}

export { getReccomendations, SongRec }

export enum Mood {
    WORKOUT = "Workout",
    SAD = "Sad",
    HAPPY = "Happy",
    CHILL = "Chill",
    ANY = "Any"
}

function moodRec(mood: Mood, songs: string[]) {
    if (mood === Mood.WORKOUT) {
        // ACOUSTICNESS 0.09-0.12 DANCEABILITY 0.7 ENERGY 0.7 MODE 0.67 VALENCE 0.48
        const ACOUSTICNESS = 0.1;
        const DANCEABILITY = 0.7;
        const ENERGY = 0.7;
        const VALENCE = 0.48;
        const MODE = 67;
        return returnSpotifyRec(10, [], [], songs, ACOUSTICNESS, DANCEABILITY, ENERGY, undefined, undefined, undefined, undefined, MODE,
            undefined, undefined, undefined, VALENCE);
    } else if (mood === Mood.SAD){
        // ACOUSTICNESS high, ENERGY low, VALENCE low
        const ACOUSTICNESS = 0.55;
        const ENERGY = 0.43;
        const VALENCE = 0.33;
        return returnSpotifyRec(10, [], [], songs, ACOUSTICNESS, undefined, ENERGY, undefined, undefined, undefined, undefined, undefined,
            undefined, undefined, undefined, VALENCE);
     
    } else if (mood === Mood.HAPPY) {
        // ACOUSTICNESS low, ENERGY high, VALENCE high
        const ACOUSTICNESS = 0.15;
        const ENERGY = 0.7;
        const VALENCE = 0.6;
        return returnSpotifyRec(10, [], [], songs, ACOUSTICNESS, undefined, ENERGY, undefined, undefined, undefined, undefined, undefined,
            undefined, undefined, undefined, VALENCE);
    } else if (mood === Mood.CHILL) {
        // ACOUSTICNESS 0.3-0.35 ENERGY 0.58-0.67 MODE 0.67 VALENCE 0.48
        const ACOUSTICNESS = 0.32;
        const ENERGY = 0.62;
        const VALENCE = 0.48;
        const MODE = 67;
        return returnSpotifyRec(10, [], [], songs, ACOUSTICNESS, undefined, ENERGY, undefined, undefined, undefined, undefined, MODE,
            undefined, undefined, undefined, VALENCE);
    } else {
        return returnSpotifyRec(10, [], [], songs, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
            undefined, undefined, undefined, undefined);
    }
}

export { moodRec }

async function getAverageStats(playlist_id: string) : Promise<any> {
    const { access_token } = await getAccessToken();
    const response = await fetch('https://api.spotify.com/v1/playlists/' + playlist_id, {
        method: 'GET',
        headers: { Authorization: `Bearer ${access_token}`,}
    });
    const data = await response.json();
    const averages: Record<string, number> = {
        avg_acousticness: 0.0,
        avg_valence: 0.0,
        avg_danceability: 0.0,
        avg_energy: 0.0,
        avg_instrumentalness: 0.0,
        avg_key: 0.0,
        avg_liveness: 0.0,
        avg_loudness: 0.0,
        avg_mode: 0.0,
        avg_speechiness: 0.0,
        avg_tempo: 0.0,
        avg_time_signature: 0.0,
    };

    let ids: string = "";
          
    for (let i = 0; i < data.tracks.items.length; i++) {
        ids += data.tracks.items[i].track.id + ",";
    }

    const song_features = await returnMultipleSongFeatures(ids);
    
    for (let i = 0; i < data.tracks.items.length; i++) {
        averages.avg_acousticness += song_features.audio_features[i].acousticness;
        averages.avg_valence += song_features.audio_features[i].valence;
        averages.avg_danceability += song_features.audio_features[i].danceability;
        averages.avg_energy += song_features.audio_features[i].energy;
        averages.avg_instrumentalness += song_features.audio_features[i].instrumentalness;
        averages.avg_key += song_features.audio_features[i].key;
        averages.avg_liveness += song_features.audio_features[i].liveness;
        averages.avg_loudness += song_features.audio_features[i].loudness;
        averages.avg_mode += song_features.audio_features[i].mode;
        averages.avg_speechiness += song_features.audio_features[i].speechiness;
        averages.avg_tempo += song_features.audio_features[i].tempo;
        averages.avg_time_signature += song_features.audio_features[i].time_signature;
   }

    for (let key in averages) {
        if (averages.hasOwnProperty(key)) {
            averages[key] /= data.tracks.items.length;
        }
    }

    return averages;
}

export { getAverageStats } // comment out after testing