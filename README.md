# react-spotify-auth

> Easy Spotify Authentication, written in React

[![NPM](https://img.shields.io/npm/v/react-spotify-auth.svg)](https://www.npmjs.com/package/react-spotify-auth) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-spotify-auth
```

```bash
yarn add react-spotify-auth
```

**Not recommended for production for versions <1.0.0**

## Usage

```jsx
import React, { useEffect, useState } from 'react'
import { SpotifyAuth, Scopes } from 'react-spotify-auth';

import { SpotifyApiContext } from "react-spotify-api";
import Cookies from 'js-cookie'

import 'react-spotify-auth/dist/index.css'
import './App.css';


const App = () => {
  const [spotifyAuthToken, setSpotifyAuthToken] = useState();

  useEffect(() => {
    setSpotifyAuthToken(Cookies.get('spotifyAuthToken'));
  }, [Cookies.get('spotifyAuthToken')])

  return (
    <div className="app">
      {/* If there is a cookie named 'spotifyAuthToken' */}
      {Cookies.get('spotifyAuthToken') ?
        (
          // Display the app
          <SpotifyApiContext.Provider value={spotifyAuthToken}>
            {/* Your Spotify Code here */}
          </SpotifyApiContext.Provider>
        ) : (
          // Display the login page
          <SpotifyAuth
            redirectUri='http://localhost:3000/callback'
            clientID='1a70ba777fec4ffd9633c0c418bdcf39'
            scopes={[Scopes.userReadPrivate, Scopes.userReadEmail]}
          />
        )
      }
    </div>
  )
}

```

Inspired by [this StackOverflow question](https://stackoverflow.com/questions/58964265/spotify-implicit-grant-flow-with-react-user-login)


## License

MIT © [kevin51jiang](https://github.com/kevin51jiang)
