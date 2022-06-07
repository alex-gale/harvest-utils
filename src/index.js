import elements from './elements/index.js'

console.log("🐝 Harvest Utilities Injected 🐝")

const refreshElements = () => {
  // check if each element is injected and if not, inject
  elements.forEach((elem) => {
    const { detect, inject } = elem

    if (!detect()) {
      inject()
    }
  })
}

// on page update, refresh our elements
document.addEventListener("DOMSubtreeModified", () => {
  refreshElements()
})