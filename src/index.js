import { UPDATE_VALUES_MESSAGE } from './constants.js'
import elements from './elements/index.js'
import { updateValues } from './utils/values-storage.js'

console.log("🐝 Harvest Utilities Injected 🐝")
updateValues()

const refreshElements = ({ shouldReset = false }) => {
  // check if each element is injected and if not, inject
  elements.forEach((elem) => {
    const { remove, detect, inject } = elem

    if (shouldReset) {
      remove()
    }

    if (!detect()) {
      inject()
    }
  })
}

// update values on message from popup code
chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  const { type } = req

  if (type === UPDATE_VALUES_MESSAGE) {
    // update values from storage, then refresh elements as a callback
    updateValues(() => refreshElements({ shouldReset: true }))
  }

  sendResponse({})
})

// on page update, refresh our elements
document.addEventListener("DOMSubtreeModified", refreshElements)