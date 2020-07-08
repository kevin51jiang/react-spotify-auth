/* eslint-disable  */
import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

import SpotifyAuth from './SpotifyAuth'

describe('SpotifyAuth', () => {
  it('is truthy', () => {
    expect(SpotifyAuth).toBeTruthy()
  })
})

test('Displays properly', async () => {
  const { container, asFragment } = render(<SpotifyAuth />)

  expect(screen.getByText('Continue with Spotify')).toBeInTheDocument()
  expect(screen.getByRole('button')).not.toHaveAttribute('disabled')

})
