import { addDays, differenceInDays, parseISO } from 'date-fns'
import { getObject, getLatestDateFileName } from './s3.js'

export const getPeriodStartsIn = async () => {
  const { REACT_APP_CYCLE_DATA_OBJECT } = process.env
  const todayDate = new Date()
  const cycleData = await getObject(REACT_APP_CYCLE_DATA_OBJECT)
  const latestDateFileName = await getLatestDateFileName()
  const latestDateObject = await getObject(latestDateFileName)

  const latestStartDate = latestDateObject
    ? parseISO(latestDateObject.startDate)
    : null
  const cycleTime = cycleData ? cycleData.cycleLengthDays : null

  const nextPeriodStartDate = addDays(latestStartDate, cycleTime)
  return differenceInDays(nextPeriodStartDate, todayDate)
}

export const onPeriodNow = async () => {
  const latestDateFileName = await getLatestDateFileName()
  const latestDateObject = await getObject(latestDateFileName)

  if (!latestDateObject) {
    return false
  }

  if (latestDateObject.startDate && latestDateObject.endDate) {
    return false
  }

  if (latestDateObject.startDate && !latestDateObject.endDate) {
    return true
  }

  return false
}
