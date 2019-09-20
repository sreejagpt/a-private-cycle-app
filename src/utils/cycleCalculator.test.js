jest.mock('./s3.js', () => ({
    getLatestDateFileName: jest.fn(() => Promise.resolve('latest-file-name')),
    getObject: jest.fn(() => Promise.resolve()),
}))
import { getObject, getLatestDateFileName } from './s3.js'
import { getPeriodStartsIn } from './cycleCalculator.js'

describe('Cycle Calculator', () => {
    it('should get the latest file name in correct directory and then fetch its contents', async () => {
        await getPeriodStartsIn()
        expect(getLatestDateFileName).toHaveBeenCalled()
        expect(getObject).toHaveBeenCalledWith('latest-file-name')
    })

    it("should request user's cycle data", async () => {
        const cycleDataFileName = 'cycle-data-file-name'
        process.env.REACT_APP_CYCLE_DATA_OBJECT = cycleDataFileName
        await getPeriodStartsIn()
        expect(getObject).toHaveBeenCalledWith(cycleDataFileName)
    })
})
