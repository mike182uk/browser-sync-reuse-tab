# browser-sync-reuse-tab

[![Version](https://img.shields.io/npm/v/browser-sync-reuse-tab.svg?style=flat-square)](https://www.npmjs.com/package/browser-sync-reuse-tab)
[![Build Status](https://img.shields.io/travis/mike182uk/browser-sync-reuse-tab.svg?style=flat-square)](http://travis-ci.org/mike182uk/browser-sync-reuse-tab)
[![npm](https://img.shields.io/npm/dm/browser-sync-reuse-tab.svg?style=flat-square)](https://www.npmjs.com/package/browser-sync-reuse-tab)
[![License](https://img.shields.io/github/license/mike182uk/browser-sync-reuse-tab.svg?style=flat-square)](https://www.npmjs.com/package/browser-sync-reuse-tab)

Attempt to reuse an existing tab that was opened by [BrowserSync](https://www.browsersync.io/).

Depending on your configuration, when you start BrowserSync, a tab is opened in your browser pointing to BrowserSync. When you restart BrowserSync another tab is opened in the browser. The more times you restart BrowserSync, the more tabs that will be opened in the browser.

This package gets around this by trying to reuse an existing tab that was already opened by BrowserSync. When you restart BrowserSync, the previously opened tab will be focused and reloaded. The window that the tab is in will also be focused.

**At this moment, only Google Chrome on OS X >= 10.10 is supported, see notes below.**

## Installation

```bash
npm install --save-dev browser-sync-reuse-tab
```

## Usage

```js
var browserSync = require('browser-sync').create()
var browserSyncReuseTab = require('browser-sync-reuse-tab')(browserSync)

browserSync.init({
  server: './src',
  open: false // do not automatically open browser
}, browserSyncReuseTab)
```

### Set which URL to open

BrowserSync lets you [configure which URL]('browser-sync-reuse-tab') to open when it starts. `browser-sync-reuse-tab` needs the `open` option that is passed to `BrowserSync.init` to be set to `false` so that it can attempt to reuse an existing tab that was already opened. You can still tell BrowserSync which URL to open when it starts by passing the name of the URL to `browser-sync-reuse-tab`:

```js
var browserSync = require('browser-sync').create()
var browserSyncReuseTab = require('browser-sync-reuse-tab')(browserSync, 'external') // open the external URL when browserSync starts

browserSync.init({
  server: './src',
  open: false // do not automatically open browser
}, browserSyncReuseTab)
```

See the [BrowserSync documentation](https://www.browsersync.io/docs/options#option-open) for the names of the URL's. By default, if no URL is specified the `local` URL will be used.

## Notes

### Which browsers are supported?

Only Google Chrome at the moment.

### Which operating systems are supported?

Only OS X >= 10.10 at the moment.

### Why is only OS X >= 10.10 supported?

This package use's [JavaScript](https://developer.apple.com/library/content/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/Introduction.html#//apple_ref/doc/uid/TP40014508) to control the browsers behaviour. Support for using *JavaScript for Automation* was added in OS X 10.10. Older versions of OS X could be supported if i had used AppleScript instead. But AppleScript is gross.

### This package seems to only really be useful to developers on OS X using Google Chrome. What gives?

This package scratches an itch for my own workflow. I predominantly use Google Chrome on OS X for development, so yeah its a bit biased. I would love to add support for other browsers and operating systems. If you fancy lending a hand, pull requests are welcome :)
