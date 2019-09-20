import { getObject, getLatestDateFileName } from './s3.js'

export const getPeriodStartsIn = async () => {
    const { REACT_APP_CYCLE_DATA_OBJECT } = process.env
    const cycleData = await getObject(REACT_APP_CYCLE_DATA_OBJECT)
    const latestDateFileName = await getLatestDateFileName()
    const latestDateObject = await getObject(latestDateFileName)
}
