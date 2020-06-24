import React, { useEffect, useState } from 'react'
import { SpotifyAuth, Scopes } from 'react-spotify-auth';
import { SpotifyApiContext, User } from "react-spotify-api";

import Cookies from 'js-cookie'
import 'react-spotify-auth/dist/index.css'
import './App.css';


const App = () => {
  const [spotifyAuthToken, setSpotifyAuthToken] = useState();

  useEffect(() => {
    setSpotifyAuthToken(Cookies.get('spotifyAuthToken'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Cookies.get('spotifyAuthToken')])

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
            <div className="info-card">
              <h2>Hi! How's it going?</h2>
            </div>
            <br />
            <SpotifyApiContext.Provider value={spotifyAuthToken}>
              <User>
                {(user) =>
                  user && user.data ? (
                    <div className="info-card">
                      {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                      <img src={user.data.images[0].url} alt="Your Spotify Profile Picture" />
                      <ul>
                        <li>Name: {user.data.display_name}</li>
                        <li>ID: {user.data.id}</li>
                        <li>Email: {user.data.email}</li>
                        <li>Type: {user.data.product}</li>
                      </ul>
                    </div>
                  ) : <p>Loading...</p>
                }
              </User>
            </SpotifyApiContext.Provider>
            <br />
            <button className="logout" onClick={logout}>Logout</button>
          </>
        ) : (
          // Display the login page
          <SpotifyAuth
            redirectUri='http://localhost:3000/callback'
            clientID='1a70ba777fec4ffd9633c0c418bdcf39'
            scopes={[Scopes.userReadPrivate, Scopes.userReadEmail]}
            className="centered"
          />
        )
      }
    </div>
  )
}

export default App
