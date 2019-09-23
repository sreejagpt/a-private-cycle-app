import { format, subDays } from 'date-fns'
import mockDate from 'mockdate'
import { getLatestDateFileName, getObject } from './s3.js'
jest.mock('./s3.js')
import { getPeriodStartsIn, onPeriodNow } from './cycleCalculator.js'

const todayDate = new Date(2016, 29, 2)
beforeEach(() => {
  mockDate.set(todayDate)
})

afterEach(() => {
  jest.clearAllMocks()
  mockDate.reset()
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

  describe('getPeriodStartsIn', () => {
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

  describe('onPeriodNow', () => {
    it('should deduce that period is happening right now if last data pulled only has startDate, no endDate', async () => {
      getObject.mockImplementation(name => {
        const contents = { startDate: 'some-start-date' }
        return Promise.resolve(contents)
      })

      const result = await onPeriodNow()
      expect(result).toBe(true)
    })

    it('should deduce that period is ended if last data pulled has both start date and end date', async () => {
      getObject.mockImplementation(name => {
        const contents = {
          startDate: 'some-start-date',
          endDate: 'some-end-date',
        }
        return Promise.resolve(contents)
      })
      const result = await onPeriodNow()
      expect(result).toBe(false)
    })

    it('should return false if last data has any other unexpected structure', async () => {
      getObject.mockImplementationOnce(name => Promise.resolve(null))
      let result = await onPeriodNow()
      expect(result).toBe(false)

      getObject.mockImplementationOnce(name =>
        Promise.resolve({ endDate: 'some-end-date' })
      )
      result = await onPeriodNow()
      expect(result).toBe(false)

      getObject.mockImplementationOnce(name =>
        Promise.resolve({ someOtherKey: 'some-garbage' })
      )
      result = await onPeriodNow()
      expect(result).toBe(false)
    })
  })
})
