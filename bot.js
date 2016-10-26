const browser = require('./browser.js')
const cheerio = require('cheerio')
const q = require('q')

const testData = [
  {action: 'goToUrl', target: 'www.bing.com'},
  {action: 'doText', target: '#sb_form_q',  textInput: 'hi'}
]

let readyTasks = []

const doTasks  = (tasks) => {

  let index=0

  browser.init()
    .then(() => {
      tasks.forEach((task) => { 
        if (task.action==='goToUrl')
          readyTasks.push(browser.url(task.target).pause(5000))
        if (task.action==='doClick')
          readyTasks.push(browser.click(task.target).pause(5000))
        if (task.action==='doText')
          readyTasks.push(browser.setValue(task.target, task.textInput).pause(5000))
      })
      return q.all(readyTasks)
    }).end()
    .then(() => {
      console.log("complete")
    })
}

doTasks(testData)
