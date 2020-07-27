import { useEffect } from 'react'

import { getHash } from './getHash'
import t from 'prop-types'

const SpotifyAuthListener = (props) => {
  useEffect(() => {
    const accessToken = getHash().access_token

    if (accessToken) {
      if (!props.noCookie) {
        document.cookie = `spotifyAuthToken=${accessToken}; max-age=${60 * 60};`
      }
      if (props.localStorage) {
        window.localStorage.setItem('spotifyAuthToken', accessToken)
      }
      props.onAccessToken(accessToken)
    }
  }, [])

  return null
}

SpotifyAuthListener.propTypes = {
  noCookie: t.bool,
  localStorage: t.bool,
  onAccessToken: t.func
}

SpotifyAuthListener.defaultProps = {
  noCookie: false,
  localStorage: false,
  onAccessToken: (token) => {}
}

export default SpotifyAuthListener
