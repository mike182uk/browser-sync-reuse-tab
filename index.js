var exec = require('child_process').exec
var path = require('path')
var browserSyncUtils = require('browser-sync/lib/utils')

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
  var browserSyncInstance = browserSync.instance
  urlToOpen = urlToOpen || 'local'

  return function () {
    var url = browserSyncInstance.options
      .get('urls')
      .get(urlToOpen)

    var command = path.resolve(__dirname, 'scripts/chrome') + ' ' + url

    exec(command, { stdio: 'ignore' }, function (error) {
      if (error) {
        var message = '{red:browser-sync-reuse-tab failed to re-use the exisiting tab :( The error was:\n\n'

        message += error.message

        browserSyncInstance.logger.info(message + '}')

        browserSyncInstance.options = browserSyncInstance.options.set('open', true)
        browserSyncUtils.openBrowser(url, browserSyncInstance.options)
      }
    })
  }
}
