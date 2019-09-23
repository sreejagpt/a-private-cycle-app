import React, { useState, useEffect } from 'react'
import styles from './Summary.module.css'
import { getPeriodStartsIn } from '../utils/cycleCalculator.js'

const Summary = () => {
  const [days, setDays] = useState(0)

  useEffect(() => {
    async function fetchData() {
      const days = await getPeriodStartsIn()
      setDays(days)
    }
    fetchData()
  }, [])

  return (
    <div className={styles.root}>
      <h1 className={styles.circle}>Period starts in {days} days</h1>
      <button className={styles.button}>Started?</button>
    </div>
  )
}

export default Summary
