template-rx
-----------

A tiny lib for templated regular expressions.

## Usage:

```javascript

const rx = require('template-rx');

/**
 * A function that returns a regular expression that captures self-closing
 * HTML tags of a given name.  Note that while all escapees require a
 * double-backslash, the forward slash does _not_ need escaped.
 */
const selfCloser = tagName => rx`/<(${tagName})([^>]+)/>/ig`;

const html = '<html><head><meta charset="utf-8" /></head><body><img src="logo.png" /></html>';

const imgRx = selfCloser('img');
// > /<img([^>]+)\/>/gi

// Arrays passed in will result in an uncaptured option list
const metaImgRx = selfCloser(['img', 'meta']);
// > /<(?:meta|img)([^>]+)\/>/gi

console.log(html.match(imgRx));
// > ['<img src="logo.png" />']

console.log(html.match(metaImgRx));
// > ['<meta charset="utf-8" />', '<img src="logo.png" />']

// Leading and trailing forward-slashes are optional if you're not using flags
const testing = rx`test-${['one', 'two', 'three']}`;
// > /test-(?:one|two|three)/

// Expressions are appropritately escaped
const evilInput = rx`options: ${['x|y', 'z']}`;
// > /options: (?:x\|y|z)/

```
