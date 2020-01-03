---
title: "Lazy Loading Images in WordPress"
date: 2019-11-22T15:22:11-06:00
type: post
resources:
- src: bananas.jpg
  title: "Bananas"
  name: "Featured Image"
categories:
- WordPress
---

Chances are high that the majority of the requests your WordPress site makes are images, and most of them probably aren't visible without scrolling. One of the most effective strategies for improving the load time of your site is to delay the loading of images until they enter the viewport. Lazy loading!

<!--more-->

When you visit a web page, your browser looks at all of the `img` tags with a valid `src` attribute and starts requests to those urls. So in order to prevent the browser from doing this, we need to return html with images that do not contain urls.

## Removing the source

If we were writing the html ourselves this removing the source would be an easy fix, but we're dealing with WordPress, so we need to modify the content output by the loop.

{{< highlight php >}}
<?php
function my_lazy_load_content_filter($content) {
  return $content;
}
add_filter('the_content', 'my_lazy_load_content_filter');
{{< / highlight >}}

Now that we have the output, we need to look for image tags, grab their source and save it to a new attribute called data-src. Then we'll set the src attribute to an empty pixel so that the html is still [valid](https://validator.w3.org/). We can use the php function [preg_replace](https://www.php.net/manual/en/function.preg-replace.php) to regex search and replace.

{{< highlight php >}}
<?php
$content = preg_replace(
  '/<img([^>]+?)src=["\'](.*?)["\'](.*?)>/',
  '<img$1 src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-src="$2"$3>',
  $content
);
{{< / highlight >}}

Regex can be very complicated, so let's go over each step. First we'll need look for an image tag.

```
<img>
```

This is only going to grab an empty `<img>` tag though, so let's grab the content between the opening and closing tags.

This set of tokens `[^>]` is saying to grab any characters that aren't end tags, to keep the search within the one image tag. The `+` quantifier means that there has to be at least 1 or more of the previous selector, and the `?` quantifier means that the search will match as few characters as possible. When we wrap all of these in parenthesis, then we're defining them as a capture group so that we can use them later in the output.

```
<img([^>]+?)>
```

With this pattern we're just grabbing all of the content between the opening and closing tags, we need to split that into the content before the src, the src, and the content after the src. Here's what that looks like:

```
<img([^>]+?)src=["\'](.*?)["\']([^>]*?)>
```

Couple new tokens here. `["\']` means that we're looking for single or double quotes. Since we're using single quotes around the whole pattern, we have to escape the single quote here, accomplished by putting a `\` before the token that we want to escape. The `.` selector matches any character, and the `*` quantifier is the same as `+` but it matches 0 or more instead of 1 or more. Honestly there are a lot of different ways of getting this result, you could probably skip the first `?` or change the last capture group to `(.*?)`. This is just my take on it.

`preg_replace` saves each capture group as a variable, so we can use `$1` to reference the first capture group, `$2` for the second and so on. So to bring it all together:

{{< highlight php >}}
<?php
$content = preg_replace(
  '/<img([^>]+?)src=["\'](.*?)["\'](.*?)>/',
  '<img$1 src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-src="$2"$3>',
  $content
);
{{< / highlight >}}

But wait! What if we don't want to lazy load an image? Let's say that if the image has a class name of "no-lazy" then we skip the source swapping. Here's what that would like:

```
<img(?![^>]+?class=["\'][^>"\']*?no-lazy)([^>]*?)src=["\'](.*?)["\'](.*?)>
```

This part `(?!)` is called a negative lookahead which means that if the pattern within matches, then the result is discarded. Hopefully you can use the previous info to figure out how the lookahead works, but if you need more direction I'd recommend [regexr](https://regexr.com). In short, we're looking if the tag contains a class, and if one of the classes is "no-lazy", then we discard the result a.k.a. skip it!

{{< highlight php >}}
<?php
$content = preg_replace(
  '/<img(?![^>]+?class=["\'][^>"\']*?no-lazy)([^>]*?)src=["\'](.*?)["\'](.*?)>/',
  '<img$1 src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-src="$2"$3>',
  $content
);
{{< / highlight >}}

Great, but we're only covering images with one source. We also need to check for images with responsive sizes. This is done with the srcset and sizes attributes, so we need to replace those with their `data-` equivalents as well. Let's put it into our filter function while we're at it.

{{< highlight php >}}
<?php
function my_lazy_load_content_filter($content) {
  // Move src to data-src for all images unless given the class "no-lazy"
  $content = preg_replace(
    '/<img(?![^>]+?class=["\'][^>"\']*?no-lazy)([^>]*?)src=["\'](.*?)["\'](.*?)>/',
    '<img$1 src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-src="$2"$3>',
    $content
  );

  // Move srcset to data-srcset for all images unless given the class "no-lazy"
  $content = preg_replace(
    '/<img(?![^>]+?class=["\'][^>"]*?no-lazy)([^>]*?)srcset=["\'](.*?)["\'](.*?)>/',
    '<img$1 data-srcset="$2"$3>',
    $content
  );

  // Move sizes to data-sizes for all images unless given the class "no-lazy"
  $content = preg_replace(
    '/<img(?![^>]+?class=["\'][^>"]*?no-lazy)([^>]*?)sizes=["\'](.*?)["\'](.*?)>/',
    '<img$1 data-sizes="$2"$3>',
    $content
  );

  return $content;
}
add_filter('the_content', 'my_lazy_load_content_filter');
{{< / highlight >}}

We did it! ... but we're only halfway there. We need to employ some javascript to switch the src when it comes into view. But before we do, let's add a class to these img elements, so that we can find them easily.

{{< highlight php >}}
<?php
function my_lazy_load_content_filter($content) {
  // Move src to data-src for all images unless given the class "no-lazy"
  $content = preg_replace(
    '/<img(?![^>]+?class=["\'][^>"\']*?no-lazy)([^>]*?)src=["\'](.*?)["\'](.*?)>/',
    '<img$1 src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-src="$2"$3>',
    $content
  );

  // Move srcset to data-srcset for all images unless given the class "no-lazy"
  $content = preg_replace(
    '/<img(?![^>]+?class=["\'][^>"]*?no-lazy)([^>]*?)srcset=["\'](.*?)["\'](.*?)>/',
    '<img$1 data-srcset="$2"$3>',
    $content
  );

  // Move sizes to data-sizes for all images unless given the class "no-lazy"
  $content = preg_replace(
    '/<img(?![^>]+?class=["\'][^>"]*?no-lazy)([^>]*?)sizes=["\'](.*?)["\'](.*?)>/',
    '<img$1 data-sizes="$2"$3>',
    $content
  );

  // Add class "lazy-load" to images with data-src that already have a class
  $content = preg_replace(
    '/<img(?=[^>]+?(?:data-src|data-srcset)=["\'])([^>]*?)class=["\']([^">]*?)["\'](.*?)>/',
    '<img$1 class="$2 lazy-load"$3>',
    $content
  );

  // Add class "lazy-load" to images with data-src that don't already have a class
  $content = preg_replace(
    '/<img(?![^>]+?class=["\'])(?=[^>]+?(?:data-src|data-srcset)=["\'])(.*?)>/',
    '<img class="lazy-load"$1>',
    $content
  );

  return $content;
}
add_filter('the_content', 'my_lazy_load_content_filter');
{{< / highlight >}}

The only new tokens here are `?=` which is a positive lookahead, and `?:` which allows us to group tokens together without creating a capture group. In our example, we do a search for both image tags without a class and image tags that already have a class attribute.

Now let's create some javascript to load the images when they enter the viewport.

## Restoring the source on scroll

Let's start with a function called "lazyEvent" that will run on scroll. We'll loop through all "lazy-load" images and replace the empty source attributes with their data counterparts.

{{< highlight js >}}
function lazyEvent() {
  document.querySelectorAll('.lazy-load').forEach(el => {
    if (onScreen(el, '-200px')) {
      if (el.hasAttribute('data-src')) {
        el.src = el.getAttribute('data-src')
      }
      if (el.hasAttribute('data-sizes')) {
        el.sizes = el.getAttribute('data-sizes')
      }
      if (el.hasAttribute('data-srcset')) {
        el.srcset = el.getAttribute('data-srcset')
      }
      el.classList.remove('lazy-load')
    }
  })
}
{{< / highlight >}}

The onScreen method is a function that we defined in a previous post about (checking if elements are within the viewport)[/posts/checking-if-elements-are-on-screen]. We have set the threshold to 200px so that we actually swap the image source a bit *before* it enters the viewport. This way we're less likely to see the image pop in.

Notice that we're also removing the "lazy-load" class once we've done the swap, so that we're not targeting those elements any more.

Here's what it all looks like together. The `createThrottledScrollEvent` function is from the (on-screen post)[/posts/checking-if-elements-are-on-screen] as well.

#### PHP
{{< highlight php >}}
<?php
function my_lazy_load_content_filter($content) {
  // Move src to data-src for all images unless given the class "no-lazy"
  $content = preg_replace(
    '/<img(?![^>]+?class=["\'][^>"\']*?no-lazy)([^>]*?)src=["\'](.*?)["\'](.*?)>/',
    '<img$1 src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-src="$2"$3>',
    $content
  );

  // Move srcset to data-srcset for all images unless given the class "no-lazy"
  $content = preg_replace(
    '/<img(?![^>]+?class=["\'][^>"]*?no-lazy)([^>]*?)srcset=["\'](.*?)["\'](.*?)>/',
    '<img$1 data-srcset="$2"$3>',
    $content
  );

  // Move sizes to data-sizes for all images unless given the class "no-lazy"
  $content = preg_replace(
    '/<img(?![^>]+?class=["\'][^>"]*?no-lazy)([^>]*?)sizes=["\'](.*?)["\'](.*?)>/',
    '<img$1 data-sizes="$2"$3>',
    $content
  );

  // Add class "lazy-load" to images with data-src that already have a class
  $content = preg_replace(
    '/<img(?=[^>]+?(?:data-src|data-srcset)=["\'])([^>]*?)class=["\']([^">]*?)["\'](.*?)>/',
    '<img$1 class="$2 lazy-load"$3>',
    $content
  );

  // Add class "lazy-load" to images with data-src that don't already have a class
  $content = preg_replace(
    '/<img(?![^>]+?class=["\'])(?=[^>]+?(?:data-src|data-srcset)=["\'])(.*?)>/',
    '<img class="lazy-load"$1>',
    $content
  );

  return $content;
}
add_filter('the_content', 'my_lazy_load_content_filter');
{{< / highlight >}}

#### JavaScript
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

function lazyEvent() {
  document.querySelectorAll('.lazy-load').forEach(el => {
    if (onScreen(el, '200px')) {
      if (el.hasAttribute('data-src')) {
        el.src = el.getAttribute('data-src')
      }
      if (el.hasAttribute('data-sizes')) {
        el.sizes = el.getAttribute('data-sizes')
      }
      if (el.hasAttribute('data-srcset')) {
        el.srcset = el.getAttribute('data-srcset')
      }
      el.classList.remove('lazy-load')
    }
  })
}

createThrottledScrollEvent()

window.addEventListener('throttleScroll', lazyEvent, false)
{{< / highlight >}}

## Additional Thoughts

We could also add lazy loading for background images. The WordPress editor doesn't have a lot of native elements that create background images, so we'll assume that we are adding a "lazy-load" class to these elements ourselves.

{{< highlight js >}}
function lazyEvent() {
  document.querySelectorAll('.lazy-load').forEach(el => {
    if (onScreen(el, '200px')) {
      if (el.tagName === 'IMG') {
        if (el.hasAttribute('data-src')) {
          el.src = el.getAttribute('data-src')
        }
        if (el.hasAttribute('data-sizes')) {
          el.sizes = el.getAttribute('data-sizes')
        }
        if (el.hasAttribute('data-srcset')) {
          el.srcset = el.getAttribute('data-srcset')
        }
      }
      else {
        if (el.hasAttribute('data-src')) {
          el.style.backgroundImage = `url(${el.getAttribute('data-src')})`
        }
      }
      el.classList.remove('lazy-load')
    }
  })
}
{{< / highlight >}}

Chrome also recently add native support for lazy loading, so if you're only concerned about Chrome, or if you want to implement lazy loading with minimal impact to performance, then you could remove the javascript and change the PHP to something like this:

{{< highlight php >}}
<?php
function my_lazy_load_content_filter($content) {
  // Add lazy loading for all images unless given the class "no-lazy"
  $content = preg_replace(
    '/<img(?![^>]+?class=["\'][^>"\']*?no-lazy)([^>]+?)>/',
    '<img loading="lazy" $1>',
    $content
  );

  return $content;
}
add_filter('the_content', 'my_lazy_load_content_filter');
{{< / highlight >}}

Speaking of modern browsers, we could also replace our `createThrottledScrollEvent` and `onScreen` methods with (Intersection Oberservers)[https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API].

Hopefully you're able to implement one of these lazy loading solutions into your WordPress theme/plugin, because deferring offscreen images is one of the quickest and easiest ways to improve site load time for your users.
