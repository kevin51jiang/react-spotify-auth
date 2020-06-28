/**
 * @class SpotifyAuth
 */

import React, { Component } from 'react'
import scopes from './Scopes'
import hash from './hash'
import styles from './styles.module.css'

// import { ReactComponent as Spotify } from './spotify.svg'
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

    const url =
      'https://accounts.spotify.com/authorize' +
      '?response_type=token' +
      `&client_id=${this.props.clientID}` +
      `&scope=${this.props.scopes.join('%20')}` +
      `&redirect_uri=${this.props.redirectUri}` +
      '&show_dialog=true'

    window.location = url
  }

  render() {
    return (
      <div
        className={this.props.containerClassName || styles.rsaSpotifyContainer}
      >
        <button
          className={styles.rsaSpotifyBtn}
          onClick={(event) => this.handleClick(event)}
        >
          <img
            src={SpotifyLogo}
            alt='Spotify Logo'
            className={this.props.btnClassName || styles.rsaSpotifyLogo}
          />
          <span className='dispText'>{this.props.title} </span>
        </button>
      </div>
    )
  }
}

SpotifyAuth.defaultProps = {
  redirectUri: 'http://localhost:3000/callback',
  clientID: '1a70ba777fec4ffd9633c0c418bdcf39',
  scopes: [scopes.userReadPrivate, scopes.userReadEmail],
  onAccessToken: () => console.log('I have an access token'),
  title: 'Continue with Spotify'
}

export default SpotifyAuth
