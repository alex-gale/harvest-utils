import { DAY_SUMMARY_NAME } from "constants"
import { timeToInt } from "./time-utils"

const getDayTotal = () => {
  const daySummaryElement = document.getElementsByClassName(DAY_SUMMARY_NAME)[0]

  if (!daySummaryElement) return

  const dayTotalElement = daySummaryElement.children[1]

  if (!dayTotalElement) return

  const dayTotalTime = dayTotalElement.innerHTML
  const dayTotalTimeFormatted = timeToInt(dayTotalTime)

  return dayTotalTimeFormatted
}

export { getDayTotal }