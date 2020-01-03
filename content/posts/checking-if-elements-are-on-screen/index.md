---
title: "Checking if Elements are On-Screen"
date: 2019-11-22T15:24:08-06:00
type: post
resources:
- src: truck.jpg
  title: "Truck"
  name: "Featured Image"
---

Whether it's lazy loading images, animating elements when they enter the viewport, or loading more content when you reach the end of a list (infinite scroll), there are a lot of scenarios in javascript when we want to see if an element is on-screen.

<!--more-->

If you're not interested in supporting IE, check out (Intersection Observers)[https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API]. Observers make it a cinch to implement viewport tracking in modern browsers, but if you want legacy support, then read on.

Our plan is to make a versatile method that allows us to check when an element is a variable distance from the top or bottom of the viewport. This function will have two arguments: the element that we want to check and it's variable distance from the viewport. It will return a boolean.

{{< highlight js >}}
function onScreen(el, distance) {
  return false
}
{{< / highlight >}}

The simplest check that we can do is if the images is *n* pixels from the viewport. This is useful for lazy loading or infinite scroll, because we can set the `distance` variable to something like `-100` and the function will return true 100px *before* it enters the viewport, preventing the user from seeing the content pop in.

{{< highlight js >}}
function onScreen(el, distance) {
  const rect = el.getBoundingClientRect()
  const visibleFromTop = rect.bottom >= 0 + distance
  const visibleFromBottom = rect.top < window.innerHeight - distance
  return visibleFromTop && visibleFromBottom
}
{{< / highlight >}}

It helps to remove "distance" from the equation first, so that we're just thinking about if the element is visible at all in the viewport. Then add in the distance variable to give us some flexibility.

Pixel offset is great for lazy loading and infinite scroll, but sometimes we want to know if an element is completely visible. We could pass the elements height as the distance variable or we could just use percentages.

Let's add in a conditional check to see if distance is a pixel value or a percentage value. If it's a pixel value, then we use our previous function. If it's a percentage value, then we check if the element is *n*% visible on the screen.

The distance variable will now be a string, so we'll take off "%" or "px" and convert the remainder to a number. Let's also change the name of the "distance" variable to "threshold" since that's a bit more accurate.

{{< highlight js >}}
function onScreen(el, threshold) {
  const rect = el.getBoundingClientRect()
  let visibleFromTop = false
  let visibleFromBottom = false
  // threshold is a percentage
  if (threshold[threshold.length - 1] === '%') {
    threshold = Number(threshold.replace(/%/g, ''))
    visibleFromTop = 100 - (rect.top / rect.height * -100) > threshold
    visibleFromBottom = 100 - ((rect.bottom - window.innerHeight) / rect.height * 100) > threshold
  }
  // threshold is a pixel value
  else {
    threshold = Number(threshold.replace(/[px]+/g, ''))
    visibleFromTop = rect.bottom >= 0 + threshold
    visibleFromBottom = rect.top < window.innerHeight - threshold
  }
  return visibleFromTop && visibleFromBottom
}
{{< / highlight >}}

Now we could run the function `onScreen(el, '100%')` and it will return true when the entire element is visible on screen. This can be useful for animating elements, so the user sees the entire animation.

One last thing that we need to do is check that the element is visible. To do this, we just check that the element's offsetParent does not equal null.

{{< highlight js >}}
function onScreen(el, threshold) {
  const rect = el.getBoundingClientRect()
  let visibleFromTop = false
  let visibleFromBottom = false
  // element is hidden
  if (el.offsetParent === null) {
    return false
  }
  // threshold is a percentage
  if (threshold[threshold.length - 1] === '%') {
    threshold = Number(threshold.replace(/%/g, ''))
    visibleFromTop = 100 - (rect.top / rect.height * -100) > threshold
    visibleFromBottom = 100 - ((rect.bottom - window.innerHeight) / rect.height * 100) > threshold
  }
  // threshold is a pixel value
  else {
    threshold = Number(threshold.replace(/[px]+/g, ''))
    visibleFromTop = rect.bottom >= 0 + threshold
    visibleFromBottom = rect.top < window.innerHeight - threshold
  }
  return visibleFromTop && visibleFromBottom
}
{{< / highlight >}}

Now we just need to attach it to a scroll listener. We'll follow (mozilla's scroll listener example)[https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event], which explains why we're throttling our listener, but we'll also make some minor adjustments so that we have an event that we can listen to.

Here it is all together.

{{< highlight js >}}
function createThrottledScrollEvent() {
  let ticking = false
  let scrollEvent = document.createEvent('Event')
  scrollEvent.initEvent('throttleScroll', true, true)
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        window.dispatchEvent(scrollEvent)
        ticking = false
      })
      ticking = true
    }
  })
}

function onScreen(el, threshold) {
  const rect = el.getBoundingClientRect()
  let visibleFromTop = false
  let visibleFromBottom = false
  // element is hidden
  if (el.offsetParent === null) {
    return false
  }
  // threshold is a percentage
  if (threshold[threshold.length - 1] === '%') {
    threshold = Number(threshold.replace(/%/g, ''))
    visibleFromTop = 100 - (rect.top / rect.height * -100) > threshold
    visibleFromBottom = 100 - ((rect.bottom - window.innerHeight) / rect.height * 100) > threshold
  }
  // threshold is a pixel value
  else {
    threshold = Number(threshold.replace(/[px]+/g, ''))
    visibleFromTop = rect.bottom >= 0 + threshold
    visibleFromBottom = rect.top < window.innerHeight - threshold
  }
  return visibleFromTop && visibleFromBottom
}

createThrottledScrollEvent()

window.addEventListener('throttleScroll', () => {
  const myElement = document.querySelector('#my-element')
  if (onScreen(myElement, '100%')) {
    console.log('Element is completely on-screen!')
  }
}), false)
{{< / highlight >}}
