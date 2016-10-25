const browser = require('./browser.js')
const cheerio = require('cheerio')

const testData = [
	{action: 'goToUrl', target: 'www.bing.com'},
	{action: 'doText', target: 'xpath',  textInput: 'hi'}
]

const doTasks  = (tasks) => {

	browser.init()
	tasks.forEach((task, i) => {
		if (task.action==='goToUrl')
			browser.url(task.target)
		if (task.action==='doClick')
			browser.click(task.target)
		if (task.action==='doText')
			browser.setValue(task.target, task.textInput)
		
		browser.pause(5000)
	})
	browser.getCommandHistory().then((history) => {
		browser.end()
		return new Promise((resolve, reject) => {
			resolve(history)
		})
	})
}

doTasks(testData)
	.then(result => {console.log(result)})