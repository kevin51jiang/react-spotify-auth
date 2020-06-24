import React, { useEffect, useState } from 'react'
import { SpotifyApiContext, User, UserTop, UserPlaylists } from 'react-spotify-api'
import Cookies from 'js-cookie'

import { SpotifyAuth, Scopes } from 'react-spotify-auth'
import 'react-spotify-auth/dist/index.css'

import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBCardImage, MDBCardUp, MDBCardTitle, MDBCardText, MDBAvatar, MDBFlippingCard, MDBBtn } from "mdbreact";
import 'mdbreact/dist/css/mdb.css'

import TrackCard from "./TrackCard";

const App = () => {
  const [spotifyAuthToken, setSpotifyAuthToken] = useState()

  useEffect(() => {
    setSpotifyAuthToken(Cookies.get('spotifyAuthToken'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Cookies.get('spotifyAuthToken')])

  const logout = () => {
    Cookies.remove('spotifyAuthToken')
    window.location = '/'
  }

  return (
    <div className='app'>
      <MDBContainer>
        {/* If there is a cookie named 'spotifyAuthToken' */}
        {Cookies.get('spotifyAuthToken') ? (
          // Display the app
          <>
            <MDBRow>
              <h1>Hi! How's it going?</h1>
            </MDBRow>

            <SpotifyApiContext.Provider value={spotifyAuthToken}>
              <User>
                {(user) =>
                  user && user.data ? (
                    <>
                      <MDBCol style={{ maxWidth: '22rem' }}>
                        <MDBCard>
                          <MDBCardImage
                            className='img-fluid'
                            src={user.data.images[0].url}
                            alt='Your Spotify Profile Picture'
                            waves
                          />
                          <MDBCardBody>
                            <MDBCardTitle>
                              Welcome, {user.data.display_name}
                            </MDBCardTitle>
                            <MDBCardText>
                              Some quick example text to build on the card
                              title and make up the bulk of the card's
                              content.
                              </MDBCardText>
                          </MDBCardBody>
                        </MDBCard>
                      </MDBCol>
                    </>
                  ) : (
                      <p>Loading...</p>
                    )
                }
              </User>
              <UserTop type="tracks">
                {(tracks, loading, error) =>
                  tracks && tracks.data ? (
                    tracks.data.items.map((track, ind) => {
                      return (
                        <>
                          <TrackCard
                            track={track} />
                        </>
                      )
                    })
                  ) : null
                }
              </UserTop>
            </SpotifyApiContext.Provider>
            <button className='logout' onClick={logout}>
              Logout
            </button>
          </>
        ) : (
            // Display the login page
            <SpotifyAuth
              redirectUri='http://localhost:3000/callback'
              clientID='1a70ba777fec4ffd9633c0c418bdcf39'
              scopes={[Scopes.userReadPrivate, Scopes.userReadEmail, Scopes.userTopRead]}
              className='centered'
            />
          )}
      </MDBContainer>
    </div>
  )
}

export default App
