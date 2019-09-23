import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button from './Button.js'

test("shows a button that says 'Started'? by default", () => {
  const { findByText } = render(<Button />)

  const expectedButtonText = 'Started?'
  const element = findByText(expectedButtonText)
  expect(element).toBeTruthy()
})

test("Button text changes to 'Ended'? when onPeriodNow is true", () => {
  const { findByText } = render(<Button onPeriodNow={true} />)

  const element = findByText('Ended?')

  expect(element).toBeTruthy()
})

test("Button text changes to 'Started'? when onPeriodNow is false", () => {
  const { findByText } = render(<Button onPeriodNow={false} />)

  const element = findByText('Started?')

  expect(element).toBeTruthy()
})
