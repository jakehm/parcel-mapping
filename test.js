const browser = require('./browser.js')
const cheerio = require('cheerio')

//these functions can be moved to a utils module
//returns a random number between 2000 and 5000
const getRand = () => {
	return Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000
}

const absolutizeLink = (url, href) => {
	if (href.substring(0,3).toLowerCase() == 'htt')
		return href
	if (!href)
		return href
	return url+'/'+href
}

const getLinks = (url) => {
	return browser
		.url(url)
		.pause(10000)
		.getSource()
		.then((source) => {
			let $ = cheerio.load(source)
			let links = $('a').map((i, e) => {
				return $(e).attr('href')
			}).get()
			return links
		})
}

const getSearchResults = (query, options = {bing: false}) => {
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

	browser.addCommand('getLinks', getLinks)

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
			browser
				.getLinks(results[0])
				.then((links) => {
					links.forEach((link) => {
						console.log(absolutizeLink(results[0], link))
					})
				})
		})
}


let searchResults = getSearchResults('bowdoin+assessor', {bing: true})
browser.end()
