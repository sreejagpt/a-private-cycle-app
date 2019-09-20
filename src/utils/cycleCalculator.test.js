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

  xit('should calculate next period by adding cycle days to most recent start date and subtracting from today', async () => {
    getObject.mockImplementation(name => {
      const contents =
        name === cycleDataFileName
          ? { cycleLengthDays: 28 }
          : { startDate: new Date() }
      Promise.resolve(contents)
    })
    const days = await getPeriodStartsIn()
  })
})
