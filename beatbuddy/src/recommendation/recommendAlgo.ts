require('dotenv').config({path: __dirname + '/.env'})

function getReccomendations(): SongRec[] {
    // TODO: actually get song recommendations
    let recs: SongRec[] = [];
    recs.push(new SongRec("cool song title"));
    return recs;
}

export async function getAccessToken(): Promise<AccessTokenResponse> {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: new URLSearchParams({
            'grant_type': 'client_credentials',
            'client_id': process.env.SPOTIFY_CLIENT_ID || "",
            'client_secret': process.env.SPOTIFY_CLIENT_SECRET || ""
        })
    });

    return await response.json()
}

export class SongRec {
    // TODO: add more necessary info
    title: string;

    constructor(title: string) {
        this.title = title;
    }
}

export interface AccessTokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
}

export {}