import React from 'react'
import { render } from '@testing-library/react'
import Summary from './Summary.js'
import { getPeriodStartsIn } from '../utils/cycleCalculator.js'
jest.mock('../utils/cycleCalculator.js')

const STARTS_IN_DAYS = 28
beforeEach(() => {
  getPeriodStartsIn.mockImplementation(() => Promise.resolve(STARTS_IN_DAYS))
})

afterEach(() => {
  jest.clearAllMocks()
})

test('loads days left till next period and shows 0 for default', async () => {
  const { findByText, rerender } = render(<Summary />)

  const expectedDefaultSummaryText = 'Period starts in 0 days'
  let element = await findByText(expectedDefaultSummaryText)
  expect(element).toBeTruthy()

  rerender(<Summary />)
  const expectedSummaryText = `Period starts in ${STARTS_IN_DAYS} days`
  element = await findByText(expectedSummaryText)
  expect(element).toBeTruthy()
})

test("shows a button that says 'Started'? by default", async () => {
  const { findByText } = render(<Summary />)

  const expectedButtonText = 'Started?'
  const element = await findByText(expectedButtonText)
  expect(element).toBeTruthy()
})
