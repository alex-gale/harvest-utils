import {
  DAILY_HOURS,
  WEEKLY_HOURS,
  DEFAULT_WEEKLY_HOURS,
  DEFAULT_DAILY_HOURS,
} from "constants"

const valueStore = {
  [WEEKLY_HOURS]: DEFAULT_WEEKLY_HOURS,
  [DAILY_HOURS]: DEFAULT_DAILY_HOURS,
}

const updateValues = (callback = () => {}) => {
  // get values from store
  chrome.storage.sync.get([WEEKLY_HOURS, DAILY_HOURS], (res) => {
    const weeklyHours = res[WEEKLY_HOURS]
    const dailyHours = res[DAILY_HOURS]

    if (typeof weeklyHours !== 'undefined') {
      valueStore[WEEKLY_HOURS] = weeklyHours
    }

    if (typeof dailyHours !== 'undefined') {
      valueStore[DAILY_HOURS] = dailyHours
    }

    callback()
  })
}

const getWeeklyHours = () => valueStore[WEEKLY_HOURS]
const getDailyHours = () => valueStore[DAILY_HOURS]

export {
  updateValues,
  getWeeklyHours,
  getDailyHours,
}