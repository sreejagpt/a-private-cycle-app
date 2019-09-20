import React from 'react'
import { render } from '@testing-library/react'
import Summary from './Summary.js'

test('shows a summary text and button', () => {
  const { queryByText } = render(<Summary />)

  const expectedSummaryText = 'Period starts in X days'
  expect(queryByText(expectedSummaryText)).toBeTruthy()

  const expectedButtonText = 'Started?'
  expect(queryByText(expectedButtonText)).toBeTruthy()
})
