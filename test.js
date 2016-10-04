const browser = require('./browser.js')
const cheerio = require('cheerio')

//returns a random number between 2000 and 5000
const getRand = () => {
	return Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000
}

//google asks for captchas from DO droplets so bing is used
let defaultOptions = { bing : false }
const getSearchResults = (query, options = defaultOptions) => {
	let url
	let selector
	let results

	if (options.bing) {
		url = 'http://www.bing.com/search?q=' + query
		selector = '#b_results li h2 a'
	} else {
		url = 'https://www.google.com/#q=' + query
		selector = '#rso div div div h3 a'
	}
	browser
		.init()
		.url(url)
		.getTitle()
		.then((title) => {
			console.log('Title was: ' + title)
		})
		.pause(10000)
		.getSource()
		.then((source) => {
			let $ = cheerio.load(source)
			results = $(selector).map((i, e) => {
				return $(e).attr('href')
			}).get()
			console.log('inside browser')
			console.log(results)
		})
		.end()
	console.log('outside browser')
	console.log(results)
	return results
}

const getLinks = (url) => {
	let results
	browser
		.init()
		.url(url)
		.pause(10000)
		.getSource()
		.then((source) => {
			let $ = cheerio.load(source)
			results = $('a').map((i, e) => {
				return $(e).attr('href')
			}).get()
		})
		.end()
	return results
}

let searchResults = getSearchResults('bowdoin+assessor', {bing: true})
console.log(searchResults)
/*let links = getLinks(searchResults[0])
links.forEach((link, i) => {
	console.log(link)
})
*/
