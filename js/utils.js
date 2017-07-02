function siblings(selector) {
  let element = document.querySelector(selector)
  let childElements = Array.from(element.parentNode.children)
  
  return childElements.filter(child => child !== element)
}

function closest(element, query) {
  while (!!element && element !== document) {
    if (element.matches(query)) {
      return element
    }
    element = element.parentNode
  }
  return null
}

function delegate(selector, eventName, targetSelector, listener) {
  document.querySelector(selector).addEventListener(eventName, event => {
    let closestMatch = closest(event.target, targetSelector)
    
    if (closestMatch) {
      event.delegateTarget = closestMatch
      listener(event)
    }
  })
}
