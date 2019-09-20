import { format, subDays } from 'date-fns'

import { getLatestDateFileName, getObject } from './s3.js'
jest.mock('./s3.js')
import { getPeriodStartsIn } from './cycleCalculator.js'

beforeEach(() => {
  jest.clearAllMocks()
})

describe('Cycle Calculator', () => {
  let cycleDataFileName = 'cycle-data-file-name'
  process.env.REACT_APP_CYCLE_DATA_OBJECT = cycleDataFileName

  beforeEach(() => {
    getLatestDateFileName.mockImplementation(() =>
      Promise.resolve('latest-file-name')
    )

    getObject.mockImplementation(() => Promise.resolve({}))
  })

  it('should get the latest file name in correct directory and then fetch its contents', async () => {
    await getPeriodStartsIn()
    expect(getLatestDateFileName).toHaveBeenCalled()
    expect(getObject).toHaveBeenCalledWith('latest-file-name')
  })

  it("should request user's cycle data", async () => {
    await getPeriodStartsIn()
    expect(getObject).toHaveBeenCalledWith(cycleDataFileName)
  })

  it('should calculate next period by adding cycle days to most recent start date and subtracting from today', async () => {
    const todayDate = new Date(2019, 1, 1)
    const today = format(todayDate, 'yyyy-MM-dd')
    const fiveDaysAgo = format(subDays(todayDate, 5), 'yyyy-MM-dd')
    const cycleLengthDays = 28

    getObject.mockImplementation(name => {
      const contents =
        name === cycleDataFileName
          ? { cycleLengthDays: cycleLengthDays }
          : { startDate: fiveDaysAgo }
      return Promise.resolve(contents)
    })
    const days = await getPeriodStartsIn(todayDate)
    expect(days).toEqual(cycleLengthDays - 5)
  })
})
