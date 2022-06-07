import { WEEK_NAV_NAME, WEEKLY_WORK_HOURS } from 'constants.js'
import { getWeekTotal } from 'utils/get-week-total.js'
import { intToTime } from 'utils/time-utils.js'

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
    const weekRemaining = WEEKLY_WORK_HOURS - getWeekTotal()
    const weekRemainingString = intToTime(weekRemaining)
  
    const weekRemainingTextElement = document.createElement('div')
    weekRemainingTextElement.classList.add('pds-text-sm')
    if (weekRemaining < 0) weekRemainingTextElement.classList.add('pds-color-red')
  
  
    weekRemainingTextElement.append(weekRemainingString)
  
    weekRemainingWrapper.append(weekRemainingTextElement)
  
    weekNavElement.append(weekRemainingWrapper)
  }
}

export default weekRemainingElement