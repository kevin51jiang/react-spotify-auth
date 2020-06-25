import React, { useEffect, useState } from 'react'
import { SpotifyApiContext, User, UserTop } from 'react-spotify-api'
import Cookies from 'js-cookie'

import { SpotifyAuth, Scopes } from 'react-spotify-auth'
import 'react-spotify-auth/dist/index.css'

import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBBtn } from "mdbreact";
import 'mdbreact/dist/css/mdb.css'

import './index.css';
import './App.scss';
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
                      <MDBCol style={{ maxWidth: '22rem', padding: '0 0 1rem 1rem' }}>
                        <MDBCard>
                          <MDBCardImage
                            className='img-fluid'
                            src={user.data.images[0].url}
                            alt='Your Spotify Profile Picture'
                            waves
                          />
                          <MDBCardBody style={{padding: '1rem'}}>
                            <MDBCardTitle>
                              Welcome, {user.data.display_name}
                            </MDBCardTitle>
                            <MDBCardText>
                              Here's some of your top tracks, as listed by Spotify.
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

              <MDBRow className="masonry-with-columns">
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
              </MDBRow>
            </SpotifyApiContext.Provider>
            <MDBBtn onClick={logout}>
              Logout
            </MDBBtn>
          </>
        ) : (
            // Display the login page
            <SpotifyAuth
              redirectUri='http://localhost:3000/callback'
              clientID='1a70ba777fec4ffd9633c0c418bdcf39'
              scopes={[Scopes.userReadPrivate, Scopes.userReadEmail, Scopes.userTopRead]}
            />
          )}
      </MDBContainer>
    </div>
  )
}

export default App
