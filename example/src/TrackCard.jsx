import React from 'react';

import { MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn } from "mdbreact";

const TrackCard = (props) => {
  return (
    <MDBCol>
      <MDBCard style={{ width: '22rem' }}>
        <MDBCardImage
          className='img-fluid'
          src={props.track.album.images[0].url}
          waves
        />
        <MDBCardBody>
          <MDBCardTitle>{props.track.name}</MDBCardTitle>
          <MDBCardText>
            {props.track.artists.map(artist => artist.name).join(' ')} <br />
            {props.track.album.name}
          </MDBCardText>
          <MDBBtn href={props.track.external_urls.spotify}>Listen on Spotify</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  )
}

export default TrackCard;
