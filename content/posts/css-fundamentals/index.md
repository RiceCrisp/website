---
title: "Third Post"
date: 2019-11-22T15:22:11-06:00
type: post
resources:
- src: person.jpg
  title: "Person"
  name: "Featured Image"
categories:
- CSS
---

CSS is simple, but it's also not.

<!--more-->

Here are a couple concepts that you need to nail down if

## Selectors

Before you start styling any elements, you have to be able to target them.

You also need to be able to string several selectors together. `input[type=radio]:checked ~ label span`

For a full list of CSS selectors check out [W3Schools](https://www.w3schools.com/cssref/css_selectors.asp) or [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)

## Cascade & Inheritance

Once you've mastered selectors, you may successfully target a specific element and apply some styles only to find that other styles are overwriting your rules. Turns out, they call them Cascading Style Sheets for a reason.

The cascade refers to the priority that styles are applied to elements. There

Check out [W3Schools](https://www.w3schools.com/css/css_specificity.asp) or [MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance) for more information.

## Units

This one is pretty simple. There are a lot of CSS properties that accept a "length" value, and these values can use a couple different units. Let's cover the big three first: "px", "em", "%".

| Unit | Description |
| --- | --- |
| px | Absolute value equal to pixels on the screen |
| em | Relative to the font size of an the element |
| % | Relative to the parent element |

For a full list of CSS units check out [W3Schools](https://www.w3schools.com/cssref/css_units.asp) or [MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units)

## Box Model

Every HTML element abides by the box model, which is to say that every element can be thought of as a couple boxes within each other.

With no styles applied, an element is a single box that wrap around the content.

## Display

These last two concepts are just element properties, but they are so fundamental to CSS styling that we really need to have them mastered.

Display has a lot of potential values, but I just want to discuss four: `none`, `block`, `inline`, `inline-block`.

- `none` is pretty simple, it completely removes the element from the page. The rest of the content will behave as though the hidden element were never there.

- `block` value means the element will start on a new line and take up as much width as it can.

- `inline` elements do NOT start a new line and only take up the width of it's own content.

- `inline-block` behaves the same as inline, but it respects padding and margin values and allows us to set a width and/or height to the element.

If you understand the differences between block, inline, and inline-block you'll have a better understanding of

## Position

When working with CSS, a problem point is usually getting elements to show up in the correct position.

We can set `top`, `right`, `bottom`, and `left` properties to

A value of `relative` positions the element relative to it's normal position. All other content will respect the space taken up by this object.

A value of `fixed` positions the element relative to the the viewport, so it will stay in the same place event when the page is scrolled. All other content will ignore the space taken up by this object.

A value of `absolute` positions the element relative to it's closest positioned ancestor. A "positioned" element is defined as an element with a position property set to anything except `static`. All other content will ignore the space taken up by an absolutely positioned object.

#### HTML
{{< highlight html >}}
<div class="container">
  <p>Absolute elements will sit on top of this text, because they are
  <p class="top-left">I'm in the top left.</p>
  <p class="bottom-right">I'm in the bottom right.</p>
  <p class="outside-right">I'm just outside of the element, on the right.</p>
</div>
{{< / highlight >}}

#### CSS
{{< highlight css >}}
.container {
  position: relative; /* We have to set the parent to relative so that the children will position themselves in relation to it */
  width: 400px;
  height: 200px;
  background: #eee;
  border: 1px solid #666;
}
.top-left {
  position: absolute;
  top: 0;
  left: 0;
}
.bottom-right {
  position: absolute;
  bottom: 0;
  right: 0;
}
.outside-right {
  position: absolute;
  left: 100%;
}
{{< / highlight >}}
