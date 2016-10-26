const browser = require('./browser.js')
const cheerio = require('cheerio')
const async = require('async')

const testData = [
	{action: 'goToUrl', target: 'www.bing.com'},
	{action: 'doText', target: 'xpath',  textInput: 'hi'}
]

const doTasks  = (tasks) => {

	let index=0

	browser.init()
	.then(() => {
		async.eachSeries(tasks, (task) => {
			if (task.action==='goToUrl')
				browser.url(task.target).pause(5000)
			if (task.action==='doClick')
				browser.click(task.target).pause(5000)
			if (task.action==='doText')
				browser.setValue(task.target, task.textInput).pause(5000)
		}).end()
	})
}

doTasks(testData)