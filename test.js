"use strict"

const browser = require('./browser.js')
const cheerio = require('cheerio')

//returns a random number between 2000 and 5000
const getRand = () => {
    return Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000
}

browser
    .init()
    .url('https://www.google.com/#q=bowdoin+assessor')
    .getTitle()
    .then((title) => {
        console.log('Title was: ' + title)
    })
    .pause(10000)
    .getSource()
    .then((source) => {
        let $ = cheerio.load(source)
        //get search result links
        $('#rso div div div h3 a').each(function() {
            console.log('hi')
        })
    })
    .end()
