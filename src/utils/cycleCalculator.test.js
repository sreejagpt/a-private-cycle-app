jest.mock('./s3.js')
import { getObject, getLatestDateFileName } from './s3.js'
import { getPeriodStartsIn } from './cycleCalculator.js'

describe('Cycle Calculator', () => {
    it('should get the latest file name in correct directory and then fetch its contents', async () => {
        await getPeriodStartsIn()
        expect(getLatestDateFileName).toHaveBeenCalled()
    })
})
