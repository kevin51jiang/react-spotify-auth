/**
 * @class SpotifyAuth
 */

import React, { Component } from 'react'
import scopes from './Scopes'
import hash from './hash'
import getRedirectUri from './generateUrl'

import styles from './SpotifyAuth.css'

import SpotifyLogo from './spotify.svg'

class SpotifyAuth extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAuthenticatedWithSpotify: false
    }
  }

  getHash = () => {
    return window.parent.location.hash
      .substring(1)
      .split('&')
      .reduce((initial, item) => {
        if (item) {
          var parts = item.split('=')
          initial[parts[0]] = decodeURIComponent(parts[1])
        }
        return initial
      }, {})
  }

  componentDidMount() {
    const accessToken = hash.access_token

    if (accessToken) {
      // eslint-disable-next-line prettier/prettier
      document.cookie = `spotifyAuthToken=${accessToken}; max-age=${60 * 60};`

      this.props.onAccessToken(accessToken)
    }
  }

  handleClick = (event) => {
    event.preventDefault()

    window.location = getRedirectUri(
      this.props.clientID,
      this.props.scopes,
      this.props.redirectUri
    )
  }

  render() {
    return (
      <button
        className={this.props.btnClassName || styles.rsaSpotifyBtn}
        onClick={(event) => this.handleClick(event)}
      >
        {!this.props.noLogo && (
          <img
            src={SpotifyLogo}
            alt='Spotify Logo'
            className={styles.rsaSpotifyLogo}
          />
        )}
        <span>{this.props.title} </span>
      </button>
    )
  }
}

SpotifyAuth.defaultProps = {
  redirectUri: 'http://localhost:3000/callback',
  clientID: '1a70ba777fec4ffd9633c0c418bdcf39',
  scopes: [scopes.userReadPrivate, scopes.userReadEmail],
  onAccessToken: (token) => console.log('Access token: ', token),
  title: 'Continue with Spotify',
  noLogo: false
}

export default SpotifyAuth
