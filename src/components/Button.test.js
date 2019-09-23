import React from 'react'
import { render } from '@testing-library/react'
import Button from './Button.js'

test("shows a button that says 'Started'? by default", () => {
  const { findByText } = render(<Button />)

  const expectedButtonText = 'Started?'
  const element = findByText(expectedButtonText)
  expect(element).toBeTruthy()
})
