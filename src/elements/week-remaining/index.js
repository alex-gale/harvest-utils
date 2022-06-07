import { WEEK_NAV_NAME } from 'constants.js'
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
    const weekRemaining = 35 - getWeekTotal()
    const weekRemainingString = intToTime(weekRemaining)
  
    const weekRemainingElement = document.createElement('div')
    weekRemainingElement.classList.add('pds-text-sm')
    if (weekRemaining < 0) weekRemainingElement.classList.add('pds-color-red')
  
  
    weekRemainingElement.append(weekRemainingString)
  
    weekRemainingWrapper.append(weekRemainingElement)
  
    weekNavElement.append(weekRemainingWrapper)
  }
}

export default weekRemainingElement