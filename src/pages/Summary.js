import React, { useState, useEffect } from 'react'
import styles from './Summary.module.css'
import { getPeriodStartsIn, onPeriodNow } from '../utils/cycleCalculator.js'
import Button from '../components/Button.js'

const fetchCycleData = async () => {
  const isPeriodNow = await onPeriodNow()
  const days = await getPeriodStartsIn()

  return [isPeriodNow, days]
}

const Summary = () => {
  const [days, setDays] = useState(0)
  const [isOnPeriodNow, setIsOnPeriodNow] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const [isPeriodNow, days] = await fetchCycleData()
      setIsOnPeriodNow(isPeriodNow)
      setDays(days)
    }
    fetchData()
  }, [])

  return (
    <div className={styles.root}>
      {isOnPeriodNow ? (
        'Period day X'
      ) : (
        <h1 className={styles.circle}>Period starts in {days} days</h1>
      )}
      <Button onPeriodNow={isOnPeriodNow} />
    </div>
  )
}

export default Summary
