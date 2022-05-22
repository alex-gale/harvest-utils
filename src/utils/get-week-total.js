import { WEEK_TOTAL_COUNTER_NAME } from "constants.js"
import { timeToInt } from './time-utils.js'

const getWeekTotal = () => {
  const weekTotalElement = document.getElementsByClassName(WEEK_TOTAL_COUNTER_NAME)[0]

  if (!weekTotalElement) return

  const weekTotalTimeString = weekTotalElement.innerHTML

  return timeToInt(weekTotalTimeString)
}

export {
  getWeekTotal
}