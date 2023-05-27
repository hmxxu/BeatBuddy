import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authorizeWithSpotify, exchangeCodeForAccessToken } from './spotifyAuth';
import { getAccessTokenFromCookie, saveAccessTokenToCookie } from './tokenCookies';

/**
 * Callback component that handles the Spotify authentication callback.
 * Retrieves the authorization code from the URL query parameters,
 * exchanges it for an access token, and saves the token in a cookie.
 * @returns null
 */
export function Callback(): any {
  const location = useLocation();
  const navigate = useNavigate();
  const [reauthorizeRequested, setReauthorizeRequested] = useState(false);

  useEffect(() => {
    console.log("in callback");
    const token = getAccessTokenFromCookie();

    if (token) {
      console.log("auth code already exchanged");
      return;
    }

    async function handleCallback() {
      const searchParams = new URLSearchParams(location.search);
      const code = searchParams.get('code');

      if (code) {
        try {
          console.log("in try of callback");
          const token = await exchangeCodeForAccessToken(code);
          saveAccessTokenToCookie(token);
          navigate('/BeatBuddy/');
        } catch (error) {
          console.error(error);
        }
      } else {
        // If the code is not available and reauthorization is requested, authorize the user
        if (reauthorizeRequested) {
          authorizeWithSpotify();
        }
      }
    }

    handleCallback();
  }, [location.search, reauthorizeRequested]);

  // Function to handle reauthorization request
  const handleReauthorize = () => {
    setReauthorizeRequested(true);
  };

}