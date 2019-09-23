import PropTypes from 'prop-types'
import React from 'react'
import styles from './Button.module.css'

const Button = ({ onPeriodNow }) => {
  return (
    <button className={styles.button}>
      {onPeriodNow ? 'Ended?' : 'Started?'}
    </button>
  )
}

Button.propTypes = {
  onPeriodNow: PropTypes.bool,
}

Button.defaultProps = {
  onPeriodNow: false,
}

export default Button
