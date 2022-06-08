import { WEEK_NAV_NAME } from 'constants.js'
import { getWeekTotal } from 'utils/get-week-total.js'
import { intToTime } from 'utils/time-utils.js'
import { getWeeklyHours } from 'utils/values-storage'

const ID = 'hutils-remaining'

const weekRemainingElement = {
  detect: () => !!document.getElementById(ID),
  inject: () => {
    const weekNavElement = document.getElementById(WEEK_NAV_NAME)

    if (!weekNavElement) return
  
    const weekRemainingWrapper = document.createElement('div')
    weekRemainingWrapper.id = ID
    weekRemainingWrapper.append('Week Remaining')
  
    const weekTotal = getWeekTotal()
    const weeklyWorkHours = getWeeklyHours()

    const weekRemaining = weeklyWorkHours - getWeekTotal()
    const weekRemainingString = intToTime(weekRemaining)
  
    const weekRemainingTextElement = document.createElement('div')
    weekRemainingTextElement.classList.add('pds-text-sm')
    if (weekRemaining < 0) weekRemainingTextElement.classList.add('pds-color-red')

    weekRemainingTextElement.append(weekRemainingString)
    weekRemainingWrapper.append(weekRemainingTextElement)
    weekNavElement.append(weekRemainingWrapper)
  },
  remove: () => {
    const weekNavElement = document.getElementById(WEEK_NAV_NAME)
    const weekRemainingWrapper = document.getElementById(ID)

    if (!weekNavElement || !weekRemainingWrapper) return

    weekNavElement.removeChild(weekRemainingWrapper)
  }
}

export default weekRemainingElement