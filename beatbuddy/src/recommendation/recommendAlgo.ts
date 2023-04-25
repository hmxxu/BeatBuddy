function getReccomendations(): SongRec[] {
    // TODO: actually get song recommendations
    let recs: SongRec[] = [];
    recs.push(new SongRec("cool song title"));
    return recs;
}

const getAccessToken = async () => {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: new URLSearchParams({
            'grant_type': 'client_credentials',
            'client_id': 'fa2af6975fc04d99a7a14a08545e88e9',
            'client_secret': 'aa5f52a28f014357b6e0b2e39687170c'
        })
    });

    const responseObject = await response.json();
    console.log(responseObject)
}

class SongRec {
    // TODO: add more necessary info
    title: string;

    constructor(title: string) {
        this.title = title;
    }
}

getAccessToken();