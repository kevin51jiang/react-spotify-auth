/**
 * @class SpotifyAuth
 */

import React, { Component } from 'react'
import scopes from './Scopes'
import getRedirectUri from './generateUrl'

import styles from './SpotifyAuth.css'
import t from 'prop-types'
import SpotifyLogo from './SpotifyLogo'
import { getHash } from './getHash'

class SpotifyAuth extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAuthenticatedWithSpotify: false
    }
  }

  componentDidMount() {
    const accessToken = getHash().access_token

    if (accessToken) {
      if (!this.props.noCookie) {
        document.cookie = `spotifyAuthToken=${accessToken}; max-age=${60 * 60};`
      }
      if (this.props.localStorage) {
        window.localStorage.setItem('spotifyAuthToken', accessToken)
      }
      this.props.onAccessToken(accessToken)
    }
  }

  handleClick = (event) => {
    event.preventDefault()

    window.location = getRedirectUri(
      this.props.clientID,
      this.props.scopes,
      this.props.redirectUri,
      this.props.showDialog
    )
  }

  render() {
    return (
      <button
        className={this.props.btnClassName || styles.rsaSpotifyBtn}
        onClick={(event) => this.handleClick(event)}
      >
        {!this.props.noLogo && (
          <SpotifyLogo className={this.props.logoClassName} />
        )}
        <span>{this.props.title}</span>
      </button>
    )
  }
}

SpotifyAuth.propTypes = {
  redirectUri: t.string.isRequired,
  clientID: t.string.isRequired,
  scopes: t.arrayOf(t.string),
  onAccessToken: t.func,
  logoClassName: t.string,
  title: t.string,
  noLogo: t.bool,
  noCookie: t.bool,
  showDialog: t.bool,
  localStorage: t.bool
}

SpotifyAuth.defaultProps = {
  redirectUri: 'http://localhost:3000',
  scopes: [scopes.userReadPrivate, scopes.userReadEmail],
  onAccessToken: (token) => {},
  title: 'Continue with Spotify',
  localStorage: false,
  noLogo: false,
  noCookie: false,
  showDialog: false,
}

export default SpotifyAuth
