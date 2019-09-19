import React from 'react'
import styles from './Summary.module.css'

const Summary = () => {
    return (
        <div className={styles.root}>
            <h1 className={styles.circle}>Period starts in X days</h1>
            <button className={styles.button}>Started?</button>
        </div>
    )
}

export default Summary
