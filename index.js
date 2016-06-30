var feed
var program = require('commander')
program
  .usage('[options] <feed>')
  .option('-i, --interval <path>', 'Update interval')
  .option('-e, --env <path>', 'Environment vars path')
  .action(f => feed = f)
  .parse(process.argv)

require('dotenv').config(program.env && {path: program.env})

var _ = require('lodash')
var Watcher = require('rss-watcher')
var Twit = require('twit')

var T = new Twit({
  consumer_key:         process.env.CONSUMER_KEY,
  consumer_secret:      process.env.CONSUMER_SECRET,
  access_token:         process.env.ACCESS_TOKEN,
  access_token_secret:  process.env.ACCESS_TOKEN_SECRET
})

var watcher = new Watcher(feed)
watcher.set({ interval: program.interval || process.env.UPDATE_INTERVAL || 60 })
watcher.on('new article', tweetArticle)
watcher.run(logErrors)

function tweetArticle(article) {
  var clean = shapeArticleData(article)
  var status = `${clean.title} ${clean.link}`
  console.log(`tweeting '${status}'`)
  T.post('statuses/update', { status }, logErrors)
}

function shapeArticleData(article) {
  var cleanedArticle = _.pick(article, 'title', 'link')
  if (cleanedArticle.title.length > 116) {
    cleanedArticle.title = cleanedArticle.title.substring(0, 113) + '...'
  }

  return cleanedArticle
}

function logErrors(err) {
  if (err) console.error(err)
}

