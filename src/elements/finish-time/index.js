import { WEEK_NAV_NAME } from 'constants.js'
import { getFinishTime } from 'utils/get-finish-time'

const ID = 'hutils-finish-time'

const finishTimeElement = {
  detect: () => !!document.getElementById(ID),
  inject: () => {
    const weekNavElement = document.getElementById(WEEK_NAV_NAME)

    if (!weekNavElement) return

    const finishTimeWrapper = document.createElement('div')
    finishTimeWrapper.id = ID
    finishTimeWrapper.append("Today's finish time")

    const finishTime = getFinishTime()

    const finishTimeTextElement = document.createElement('div')
    finishTimeTextElement.classList.add('pds-text-sm')

    finishTimeTextElement.append(finishTime)

    finishTimeWrapper.append(finishTimeTextElement)

    weekNavElement.append(finishTimeWrapper)
  }
}

export default finishTimeElement