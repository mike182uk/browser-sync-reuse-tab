var browserSyncUtils = require('browser-sync/lib/utils')
var exec = require('child_process').exec
var path = require('path')

/**
 * Exports
 */

module.exports = reuseExistingTab

/**
 * Attempt to reuse an existing tab that was opened by BrowserSync
 *
 * @param {BrowserSync} browserSync
 * @param {string} urlToOpen
 */

function reuseExistingTab (browserSync, urlToOpen) {
  if (urlToOpen === false) return

  var browserSyncInstance = browserSync.instance
  urlToOpen = urlToOpen || 'local'

  return function () {
    var url = browserSyncInstance.options
      .get('urls')
      .get(urlToOpen)

    var command = path.resolve(__dirname, 'scripts/chrome') + ' ' + url

    exec(command, { stdio: 'ignore' }, function (error) {
      if (error) {
        // log message to console
        var message = '{red:browser-sync-reuse-tab failed to reuse the existing tab :( The error was:\n\n'

        message += error.message
        message += '}'

        browserSyncInstance.logger.info(message)

        // fallback to default BrowserSync behaviour
        browserSyncInstance.options = browserSyncInstance.options.set('open', true)
        browserSyncUtils.openBrowser(url, browserSyncInstance.options)
      }
    })
  }
}
