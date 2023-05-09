import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { exchangeCodeForAccessToken } from './spotifyAuth';
import { getAccessTokenFromCookie, saveAccessTokenToCookie } from './tokenCookies';

/**
 * Callback component that handles the Spotify authentication callback.
 * Retrieves the authorization code from the URL query parameters,
 * exchanges it for an access tokn, and saved the token in a cookie.
 * @returns null
*/
export function Callback(): any {

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {

    if (getAccessTokenFromCookie()){
      console.log("auth code already exchanged");
      return;
    }

    async function handleCallback() {
      const searchParams = new URLSearchParams(location.search);
      const code = searchParams.get('code');

      if (code) {
        try {
          const token = await exchangeCodeForAccessToken(code);
          saveAccessTokenToCookie(token);
          navigate('/BeatBuddy/');
        } catch (error) {
          console.error(error);
        }
      } else {

      }
    }

    handleCallback();
  }, [location.search]);

  return null;
}