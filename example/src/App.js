import React, { useEffect, useState } from 'react'

import { SpotifyAuth, Scopes } from 'react-spotify-auth';

import { SpotifyApiContext, User, Track } from "react-spotify-api";

import Cookies from 'js-cookie'
import 'react-spotify-auth/dist/index.css'


const App = () => {
  const [userInfo, setUserInfo] = useState({});
  const [spotifyAuthToken, setSpotifyAuthToken] = useState();

  useEffect(() => {
    setSpotifyAuthToken(Cookies.get('spotifyAuthToken'));
  })

  const onAccessToken = (newToken) => {
    setSpotifyAuthToken(newToken);
  }

  const logout = () => {
    Cookies.remove('spotifyAuthToken');
    window.location = '/'
  }

  return (
    <div className="app">
      {/* If there is a cookie named 'spotifyAuthToken' */}
      {Cookies.get('spotifyAuthToken') ?
        (
          // Display the app
          <>
            <h1>Hi! Welcome to the App</h1>
            <SpotifyApiContext.Provider value={spotifyAuthToken}>
              <User>
                {(user, loading, error) =>
                  user ? (
                    <ul>
                      {console.log('user.display_name', user.display_name)}
                      <li>Name - {user.display_name}</li>
                      <li>ID - {user.id}</li>
                    </ul>
                  ) : null
                }
              </User>
              <Track id="4kmBkq3ONzENSIRv2ah8Gh">
                {(track, loading, error) => (
                  track ? <h1>{track.name}</h1> : null
                )}
              </Track>
            </SpotifyApiContext.Provider>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          // Display the login page
          <SpotifyAuth
            redirectUri='http://localhost:3000/callback'
            clientID='1a70ba777fec4ffd9633c0c418bdcf39'
            scopes={[Scopes.userReadPrivate, Scopes.userReadEmail]}
            on
          />
        )
      }
    </div>
  )
}

export default App
