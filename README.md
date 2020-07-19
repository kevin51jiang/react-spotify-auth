# react-spotify-auth

> Easy Spotify Authentication, written in React

[![NPM](https://img.shields.io/npm/v/react-spotify-auth.svg)](https://www.npmjs.com/package/react-spotify-auth) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Build Status](https://travis-ci.org/kevin51jiang/react-spotify-auth.svg?branch=master)](https://travis-ci.org/kevin51jiang/react-spotify-auth) ![GitHub stars](https://img.shields.io/github/stars/kevin51jiang/react-spotify-auth?style=social)

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

function App = () => {
  <SpotifyAuth
    redirectUri='http://localhost:3000/callback'
    clientID='your client id from spotify here'
    scopes={[Scopes.userReadPrivate, Scopes.userReadEmail]}
  />
}
```

## Demos

[User's top tracks](http://kevinjiang.ca/react-spotify-auth/) (all user accounts)

[Spotify Web Player](https://kevinjiang.ca/Spotify-Web-Player/) (Premium Spotify accounts only, must be listening to a track prior to using)

## Usage

```jsx
import React from 'react'
import { SpotifyApiContext } from 'react-spotify-api'
import Cookies from 'js-cookie'

import { SpotifyAuth, Scopes } from 'react-spotify-auth'
import 'react-spotify-auth/dist/index.css'

const App = () => {
  const token = Cookies.get('spotifyAuthToken')
  return (
    <div className='app'>
      {token ? (
        <SpotifyApiContext.Provider value={token}>
          {/* Your Spotify Code here */}
          <p>You are authorized with token: {token}</p>
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
export default App
```

## API

Here's some props that can be used to customize the button. Please enter your own values for `redirectUri` and `clientID`, otherwise your project may not work correctly.

| Name            | Required | Default                                    | Description                                                                                                                                                                           |
| --------------- | :------: | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `redirectUri`   |    ✅    | `http://localhost:3000`                    | Spotify redirect URI. In most cases, this is the URL of your webpage. _It must be set in your Developer Console_.                                                                     |
| `clientID`      |    ✅    |                                            | Spotify app Client ID. Can be found from the Spotify Developer Console.                                                                                                               |
| `scopes`        |          | `['user-read-private', 'user-read-email']` | _Array_ of camelCased equivalent for the scopes you are requesting. For example, if you wanted the scope `user-read-recently-played` you can enter `[Scopes.userReadRecentlyPlayed]`. |
| `onAccessToken` |          | `(token) => {}`                            | Function that gets triggered when the component recognizes an access token after an auth grant. Is called with the parameter `accessToken`.                                           |
| `title`         |          | "Continue with Spotify"                    | Message inside the button.                                                                                                                                                            |
| `btnClassName`  |          | style included in package                  | Class(es) that is given to the button.                                                                                                                                                |
| `noLogo`        |          | `false`                                    | Removes the Spotify logo from the button.                                                                                                                                             |
| `localStorage`  |          | `false`                                    | Uses `window.localStorage` as a method to store the token. Note that localstorage does not have an expiry.                                                                            |
| `noCookie`      |          | `false`                                    | Does not store the auth token in a cookie named `SpotifyAuth`                                                                                                                         |

## Scopes

As indicated in the table above, scopes are accessible by the camelCased name given by Spotify. A full list can be found [here](https://developer.spotify.com/documentation/general/guides/scopes/) along with their descriptions. These are included in the package mainly to help autocomplete and prevent annoying typos.

```jsx
import { Scopes } from 'react-spotify-auth'

console.log(Scopes.appRemoteControl) // -> 'app-remote-control'
```

## Persistence

Logging in every time a user wants to use your service is annoying.

To solve that problem, an entry is added to the user's cookies under `spotifyAuthToken`. As per Spotify docs, it has an expiration time of 2 hours after which the token will stop working. If you want to disable the cookie, you can pass in the prop `noCookie`.

You can access it directly through [cookies.get()](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/cookies/get) or through a library like [js-cookie](https://www.npmjs.com/package/js-cookie).

If you prefer working with the [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), a prop of `localStorage` can be passed into the component, which can be accessed at `spotifyAuthToken`. Keep in mind however, that this does not offer the 2h expiry window.

## Changelog
0.5.3
 - Bump deps for security

0.5.1
- Potentially breaking changes by changing the values of default props, and adding new ones. Also better docs woo!
- Default props:
  - clientID: 1a70ba777fec4ffd9633c0c418bdcf39 -> nothing
  - redirectUri: http://localhost:3000/callback -> http://localhost:3000
  - onAccessToken: `(token) => console.log('Access token: ', token)` -> `(token) => {}`
- Added props:
  - `localStorage`, `noCookie`

## License & Attribution

MIT © [kevin51jiang](https://github.com/kevin51jiang)

Inspired by [this StackOverflow question](https://stackoverflow.com/questions/58964265/spotify-implicit-grant-flow-with-react-user-login)
