var rate   = 15000;
var _count  = 1;
// var config = require('./config');
var sent   = require('./sentiment');
var Twit   = require('twit');
var twits  = [];
var T      = new Twit(config);

var config = {
  consumer_key:         process.env.TWITTER_CONSUMER_KEY,
  consumer_secret:      process.env.TWITTER_CONSUMER_SECRET,
  access_token:         process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret:  process.env.TWITTER_ACCESS_TOKEN_SECRET,
  timeout_ms:           60*1000  // optional HTTP request timeout to apply to all requests.
}

exports.loadData = function(res, req) {
  sent.loadData()
}

exports.getAllTwits = function(res, req) {
  sent.getAll(res, req);
}

exports.getTwitsSearch = function(res, search, lang, count) {

  T.get('search/tweets', {
    q: search,
    lang: lang ? lang : "en",
    count: count ? count : _count,
    result_type: "recent"
  }, function (err, data, response) {

    twits = [];
    for (var t in data.statuses) {

      twits.push({
        "text" : data.statuses[t].text.trim(),
        "id" : data.statuses[t].id,
        "location" : data.statuses[t].user.location
      });
      // twits.push(data.statuses[t].text.trim());
    }

    sent.getSentiment(res, search, twits);
  });
}

exports.removeTwitsSearch = function(res, search) {
  sent.removeTopicResults(res, search);
}

// exports.getTwitsTrending = function() {

//   T.get('trends/closest', {
//     lat: 51.8969,
//     long: 8.4863
//   }, function (err, data, response) {

//     console.log("Trending:\n" + JSON.stringify(data, null));

//     for (var t in data.statuses) {
//       // twits.push({
//       //   "text" : data.statuses[t].text,
//       //   "location" : data.statuses[t].user.location
//       // });
//       twits.push(data.statuses[t].text.trim());
//     }

//     sent.getSentiment(res, search, twits);
//   });
// }
