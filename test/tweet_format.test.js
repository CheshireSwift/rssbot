'use strict';

var assert = require('assert')

describe('an article that has been formatted as a tweet', () => {
    var articleForTweet = require('../lib/articleForTweet')

    it('consists of the title (up to 116 characters) and link', () => {
        var title = '1234567890'.repeat(11) + '123456'
        var link = 'http://example.com'
        var article = { title, link }
        var status = articleForTweet(article)
        assert.equal(status, title + ' ' + link, 'Status should be article title + link')
    })

    it('has long titles truncated to 116 characters to leave room for the shortened link', () => {
        var mostOfTitle = '1234567890'.repeat(11)
        var title = mostOfTitle + '1234567'
        var link = 'http://example.com'
        var article = { title, link }
        var status = articleForTweet(article)
        assert.equal(status, mostOfTitle + '123... ' + link, 'Long title should be truncated in status')
    })
})
