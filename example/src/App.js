import React, { useEffect, useState } from 'react'
import { SpotifyAuth, Scopes } from 'react-spotify-auth';
import { SpotifyApiContext, User } from "react-spotify-api";

import Cookies from 'js-cookie'
import 'react-spotify-auth/dist/index.css'


const App = () => {
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
            <h1>Hi! Welcome to your new App</h1>
            <SpotifyApiContext.Provider value={spotifyAuthToken}>
              <h2>Profile:</h2>
              <User>
                {(user) =>
                  user && user.data ? (
                    <ul>
                      {console.log('user.display_name', user)}
                      <li>Name - {user.data.display_name}</li>
                      <li>ID - {user.data.id}</li>
                      <li>Email - {user.data.email}</li>
                    </ul>
                  ) : <p>Loading...</p>
                }
              </User>
            </SpotifyApiContext.Provider>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          // Display the login page
          <SpotifyAuth
            redirectUri='http://localhost:3000/callback'
            clientID='1a70ba777fec4ffd9633c0c418bdcf39'
            scopes={[Scopes.userReadPrivate, Scopes.userReadEmail]}
            onAccessToken={onAccessToken}
          />
        )
      }
    </div>
  )
}

export default App
