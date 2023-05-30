declare global {
    namespace NodeJS {
      interface ProcessEnv {
        REACT_APP_SPOTIFY_CLIENT_ID: string;
        REACT_APP_SPOTIFY_CLIENT_SECRET: string;
        REACT_APP_SPOTIFY_REDIRECT_URI_PROD: string;
        REACT_APP_SPOTIFY_REDIRECT_URI_LOCAL: string;
        REACT_APP_STAGE: string;
        }
    }
}

export {}