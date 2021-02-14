const getRedirectUrl = (clientID, scopes, redirectUri, showDialog) => {
  return (
    'https://accounts.spotify.com/authorize?response_type=token' +
    `&client_id=${clientID}` +
    `&scope=${scopes.join('%20')}` +
    `&redirect_uri=${redirectUri}` +
    '&show_dialog=' +
    Boolean(showDialog)
  )
}

export default getRedirectUrl
