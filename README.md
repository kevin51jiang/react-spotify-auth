# react-spotify-auth

> Easy Spotify Authentication, written in React

[![NPM](https://img.shields.io/npm/v/react-spotify-auth.svg)](https://www.npmjs.com/package/react-spotify-auth) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Build Status](https://travis-ci.org/kevin51jiang/react-spotify-auth.svg?branch=master)](https://travis-ci.org/kevin51jiang/react-spotify-auth)

## Install

```bash
npm install --save react-spotify-auth
```

```bash
yarn add react-spotify-auth
```

**Not recommended for production for versions <1.0.0**

## Quickstart

```jsx
import { SpotifyAuth, Scopes } from 'react-spotify-auth'
import 'react-spotify-auth/dist/index.css' // if using the included styles

<SpotifyAuth
  redirectUri='http://localhost:3000/callback'
  clientID='your client id from spotify here'
  scopes={[Scopes.userReadPrivate, Scopes.userReadEmail]}
/>
```

## Demos

[User's top tracks](http://kevinjiang.ca/react-spotify-auth/) (all user accounts)

[Spotify Web Player](https://kevinjiang.ca/Spotify-Web-Player/) (Premium Spotify accounts only, must be listening to a track prior to using)

## Usage

```jsx
import React from 'react'
import { SpotifyApiContext } from 'react-spotify-api'

import { SpotifyAuth, Scopes } from 'react-spotify-auth'
import 'react-spotify-auth/dist/index.css'

const App = () => {
  return (
    <div className='app'>
      {window.localStorage.getItem('spotifyAuthToken') ? (
        <SpotifyApiContext.Provider value={spotifyAuthToken}>
          {/* Your Spotify Code here */}
        </SpotifyApiContext.Provider>
      ) : (
        // Display the login page
        <SpotifyAuth
          redirectUri='http://localhost:3000/callback'
          clientID='1a70ba777fec4ffd9633c0c418bdcf39'
          scopes={[Scopes.userReadPrivate, 'user-read-email']} // either style will work
        />
      )}
    </div>
  )
}
```

## API

Here's some props that you can use to customize the button. Please enter your own values for `redirectUri` and `clientID`, otherwise your project may not work correctly.

| Name            | Required | Default                                           | Description                                                                                                                                                                           |
| --------------- | :------: | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `redirectUri`\* |    ✅    |                                                   | Spotify redirect URI. In most cases, this is the URL of your webpage. _It must be set in your Developer Console_.                                                                     |
| `clientID`\*    |    ✅    |                                                   | Spotify app Client ID. Can be found from the Spotify Developer Console.                                                                                                               |
| `scopes`\*      |          | `['user-read-private', 'user-read-email']`        | _Array_ of camelCased equivalent for the scopes you are requesting. For example, if you wanted the scope `user-read-recently-played` you can enter `[Scopes.userReadRecentlyPlayed]`. |
| `onAccessToken` |          | `(token) => console.log('Access token: ', token)` | Function that gets triggered when the component recognizes an access token after an auth grant. Is called with the parameter `accessToken`.                                           |
| `title`         |          | Continue with Spotify                             | Message inside the button. By default, it is "Continue with Spotify".                                                                                                                 |
| `btnClassName`  |          | style included in package                         | Class(es) that is given to the button. By default, the package includes one already.                                                                                                  |
| `noLogo`        |          | false                                             | Removes the Spotify logo from the button.                                                                                                                                             |

## Scopes

As indicated in the table above, scopes are accessible by the camelCased name given by Spotify. A full list can be found [here](https://developer.spotify.com/documentation/general/guides/scopes/) along with their descriptions.

```jsx
import { Scopes } from 'react-spotify-auth'

console.log(Scopes.appRemoteControl) // -> 'app-remote-control'
```

## Persistence

Logging in every time a user wants to use your service is annoying.

To solve that problem, an entry is added to `window.localStorage` under `spotifyAuthToken`. As per Spotify docs, it has an expiration time of 2 hours after which the token will stop working.

You can access it directly through the [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) or through a library like [js-cookie](https://www.npmjs.com/package/js-cookie).

## License & Attribution

MIT © [kevin51jiang](https://github.com/kevin51jiang)

Inspired by [this StackOverflow question](https://stackoverflow.com/questions/58964265/spotify-implicit-grant-flow-with-react-user-login)
