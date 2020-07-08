import generateUrl from './generateUrl'
import Scopes from './Scopes'

describe('generateUrl', () => {
  it('generates fine with default settings', () => {
    const clientID = '1a70ba777fec4ffd9633c0c418bdcf39'
    const scopes = [Scopes.userReadPrivate, Scopes.userReadEmail]
    const redirectUri = 'http://localhost:3000/callback'

    const goodUrl =
      'https://accounts.spotify.com/authorize?response_type=token&client_id=1a70ba777fec4ffd9633c0c418bdcf39&scope=user-read-private%20user-read-email&redirect_uri=http://localhost:3000/callback&show_dialog=true'

    expect(generateUrl(clientID, scopes, redirectUri)).toEqual(goodUrl)
  })
  it('generates fine with all the scopes', () => {
    const clientID = '1a70ba777fec4ffd9633c0c418bdcf39'
    const scopes = Object.keys(Scopes).map((scope) => scope)
    const redirectUri = 'http://localhost:3000/callback'

    const goodUrl =
      'https://accounts.spotify.com/authorize?response_type=token&client_id=1a70ba777fec4ffd9633c0c418bdcf39&scope=ugcImageUpload%20userFollowRead%20userFollowModify%20userReadRecentlyPlayed%20userTopRead%20userReadPlaybackPosition%20userLibraryRead%20userLibraryModify%20userReadPlaybackState%20userReadCurrentlyPlaying%20userModifyPlaybackState%20playlistReadCollaborative%20playlistModifyPrivate%20playlistModifyPublic%20playlistReadPrivate%20streaming%20appRemoteControl%20userReadEmail%20userReadPrivate&redirect_uri=http://localhost:3000/callback&show_dialog=true'

    expect(generateUrl(clientID, scopes, redirectUri)).toEqual(goodUrl)
  })
})
