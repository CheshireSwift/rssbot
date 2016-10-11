'use strict';

var opts = require('./lib/command')
opts.parse(process.argv)
require('dotenv').config(opts.env && {path: opts.env})

var logErrors = require('./lib/logErrors')
var articleForTweet = require('./lib/articleForTweet')
var Twit = require('twit')
var Watcher = require('rss-watcher')

var T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

var watcher = new Watcher(opts.feed)
var interval = opts.interval || process.env.UPDATE_INTERVAL || 60
var watcherOpts = {
  interval
}
watcher.set(watcherOpts)
watcher.on('new article', function(article) {
  var status = articleForTweet(article)
  console.info(`tweeting '${status}'`)
  T.post('statuses/update', { status }, logErrors)
})

console.log(`tweeting posts on ${opts.feed} with options:`, watcherOpts)
watcher.run(logErrors)
