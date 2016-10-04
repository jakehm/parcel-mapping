const webdriverio = require('webdriverio')
let options = {
    desiredCapabilities: {
        browserName: 'chrome', chromeOptions: {
            prefs: {
                'profile.default_content_setting_values.notifications': 2
            }
        }
    },
    logOutput: './webdriver.log'
}

module.exports = webdriverio.remote(options)
