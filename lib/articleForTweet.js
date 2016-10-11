'use strict';

var _ = require('lodash')

function articleForTweet(article) {
  var clean = shapeArticleData(article)
  var status = `${clean.title} ${clean.link}`
  return status
}

function shapeArticleData(article) {
  var cleanedArticle = _.pick(article, 'title', 'link')
  cleanedArticle.title = _.truncate(cleanedArticle.title, { length: 116 } )
  return cleanedArticle
}

module.exports = articleForTweet
