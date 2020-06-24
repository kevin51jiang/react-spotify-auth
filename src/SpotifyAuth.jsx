/**
 * @class SpotifyAuth
 */

import React, { Component } from 'react'
import scopes from './Scopes'
import hash from './hash'
import styles from './styles.module.css'

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
      document.cookie = `spotifyAuthToken=${accessToken}; max-age=${
        60 * 60
      }; Secure;`
      this.props.onHasAccessToken(accessToken)
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
      <div className={this.props.containerClassName}>
        <button
          className={this.props.btnClassName}
          onClick={(event) => this.handleClick(event)}
        >
          Continue with Spotify
        </button>
      </div>
    )
  }
}

SpotifyAuth.defaultProps = {
  redirectUri: 'http://localhost:3000/callback',
  clientID: '1a70ba777fec4ffd9633c0c418bdcf39',
  scopes: [scopes.userReadPrivate, scopes.userReadEmail],
  onHasAccessToken: () => console.log('I have an access token'),
  containerClassName: 'spotify-signin-container',
  btnClassName: 'spotify-signin-btn'
}

export default SpotifyAuth
