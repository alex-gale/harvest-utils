import { DAILY_HOURS, UPDATE_VALUES_MESSAGE, WEEKLY_HOURS } from "./constants"

const DEFAULT_WEEKLY_HOURS = 35
const DEFAULT_DAILY_HOURS = 7

const inputIdMap = {
  [WEEKLY_HOURS]: 'weekly-hours-input',
  [DAILY_HOURS]: 'daily-hours-input',
}

const buttonIdMap = {
  [WEEKLY_HOURS]: 'weekly-hours-button',
  [DAILY_HOURS]: 'daily-hours-button',
}

const run = () => {
  // generic getter/setter for values
  const valueStorage = {
    get: (valueName, callback) => {
      chrome.storage.sync.get([valueName], (res) => {
        callback(res[valueName])
      })
    },
    set: (valueName, value, callback) => {
      chrome.storage.sync.set(
        { [valueName]: value },
        callback,
      )
    }
  }
  
  // gets value from input and updates in sync storage
  const updateValue = (valueName) => {
    const inputId = inputIdMap[valueName]
    const buttonId = buttonIdMap[valueName]

    const newValue = document.getElementById(inputId).value

    
    valueStorage.set(valueName, newValue, () => {
      // flash button message
      const button = document.getElementById(buttonId)
      button.innerHTML = 'Done!'

      setTimeout(() => button.innerHTML = "Set", 1000)

      // send message to any harvest tabs to update
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const {
          id: tabId
        } = tabs[0]

        chrome.tabs.sendMessage(tabId, {
          type: UPDATE_VALUES_MESSAGE
        })
      })
    })
  }

  // setup input & button for value
  const setupValues = (valueName, initialValue) => {
    const inputId = inputIdMap[valueName]
    const buttonId = buttonIdMap[valueName]

    document.getElementById(inputId).value = initialValue

    document.getElementById(buttonId).addEventListener('click', () => updateValue(valueName))
  }

  const restoreValues = () => {
    // get weekly value
    valueStorage.get(WEEKLY_HOURS, (weeklyHours) => {
      console.log(weeklyHours)
      if (typeof weeklyHours === 'undefined') {
        valueStorage.set(WEEKLY_HOURS, DEFAULT_WEEKLY_HOURS, () => {
          setupValues(WEEKLY_HOURS, DEFAULT_WEEKLY_HOURS)
        })
      } else {
        setupValues(WEEKLY_HOURS, weeklyHours)
      }
    })

    // get daily value
    valueStorage.get(DAILY_HOURS, (dailyHours) => {
      if (typeof dailyHours === 'undefined') {
        valueStorage.set(DAILY_HOURS, DEFAULT_DAILY_HOURS, () => {
          setupValues(DAILY_HOURS, DEFAULT_DAILY_HOURS)
        })
      } else {
        setupValues(DAILY_HOURS, dailyHours)
      }
    })
  }

  document.addEventListener('DOMContentLoaded', restoreValues)
}

run()