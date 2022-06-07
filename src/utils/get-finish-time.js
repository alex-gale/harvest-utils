import dayjs from 'dayjs'
import { DAILY_WORK_HOURS, WEEKLY_WORK_HOURS, TIME_FORMAT } from 'constants'
import { getWeekTotal } from './get-week-total'
import { formatDate } from './time-utils'
import { getDayTotal } from './get-day-total'

const getFinishTime = () => {
  const currentTime = dayjs()
  const weekRemaining = WEEKLY_WORK_HOURS - getWeekTotal()
  const dayTotal = getDayTotal()

  // no time left in the week
  if (weekRemaining <= 0) {
    return 'Done for the week!'
  }

  // less than a day's time left in the week
  if (weekRemaining < DAILY_WORK_HOURS) {
    const finishTime = currentTime.add(weekRemaining, 'hours')

    return finishTime.format(TIME_FORMAT)
  }

  // 
  if (dayTotal < DAILY_WORK_HOURS) {
    const remainingTime = DAILY_WORK_HOURS - dayTotal
    const finishTime = currentTime.add(remainingTime, 'hours')

    return finishTime.format(TIME_FORMAT)
  }

  return currentTime.format(TIME_FORMAT)
}

export { getFinishTime }