import { format, addDays, differenceInDays, parseISO } from 'date-fns'
import { getObject, getLatestDateFileName } from './s3.js'

export const getPeriodStartsIn = async todayDate => {
  const { REACT_APP_CYCLE_DATA_OBJECT } = process.env
  const cycleData = await getObject(REACT_APP_CYCLE_DATA_OBJECT)
  const latestDateFileName = await getLatestDateFileName()
  const latestDateObject = await getObject(latestDateFileName)

  const latestStartDate = parseISO(latestDateObject.startDate) || null
  const cycleTime = cycleData.cycleLengthDays || null

  const nextPeriodStartDate = addDays(latestStartDate, cycleTime)
  return Math.abs(differenceInDays(todayDate, nextPeriodStartDate))
}
