declare global {
    namespace NodeJS {
      interface ProcessEnv {
            REACT_APP_SPOTIFY_CLIENT_ID: string;
            REACT_APP_SPOTIFY_CLIENT_SECRET: string;
        }
    }
}

export {}