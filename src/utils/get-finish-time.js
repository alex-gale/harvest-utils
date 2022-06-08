import dayjs from 'dayjs'
import { TIME_FORMAT } from 'constants'
import { getWeekTotal } from './get-week-total'
import { formatDate } from './time-utils'
import { getDayTotal } from './get-day-total'
import { getDailyHours, getWeeklyHours } from './values-storage'

const getFinishTime = () => {
  const dailyWorkHours = getDailyHours()
  const weeklyWorlHours = getWeeklyHours()

  const currentTime = dayjs()
  const weekRemaining = weeklyWorlHours - getWeekTotal()
  const dayTotal = getDayTotal()

  // no time left in the week
  if (weekRemaining <= 0) {
    return 'Done for the week!'
  }

  // less than a day's time left in the week
  if (weekRemaining < dailyWorkHours) {
    const finishTime = currentTime.add(weekRemaining, 'hours')

    return finishTime.format(TIME_FORMAT)
  }

  // still hours to go in the day
  if (dayTotal < dailyWorkHours) {
    const remainingTime = dailyWorkHours - dayTotal
    const finishTime = currentTime.add(remainingTime, 'hours')

    return finishTime.format(TIME_FORMAT)
  }

  return 'Done for the day!'
}

export { getFinishTime }