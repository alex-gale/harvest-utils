import { ENTRY_LIST_NAME } from "constants.js"

// checks if harvest timer is active
const checkRunning = () => {
  // get list of entries
  const entryList = document.getElementsByClassName(ENTRY_LIST_NAME)[0]

  if (!entryList || entryList.children.length === 0) {
    return false
  }

  // get last entry in list
  const lastEntry = entryList.children[entryList.children.length - 1]
  // get last class of last entry
  const lastClass = lastEntry.classList[lastEntry.classList.length - 1]

  const isRunning = lastClass === 'is-running'

  return isRunning
}

export {
  checkRunning
}