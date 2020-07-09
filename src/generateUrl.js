const getRedirectUrl = (clientID, scopes, redirectUri) => {
  return (
    'https://accounts.spotify.com/authorize?response_type=token' +
    `&client_id=${clientID}` +
    `&scope=${scopes.join('%20')}` +
    `&redirect_uri=${redirectUri}` +
    '&show_dialog=true'
  )
}

export default getRedirectUrl
