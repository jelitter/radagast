var rate   = 15000;
var _count  = 10;
var sent   = require('./sentiment');
var Twit   = require('twit');
var twits  = [];

var config = {
  consumer_key:         process.env.consumer_key,
  consumer_secret:      process.env.consumer_secret,
  access_token:         process.env.access_token,
  access_token_secret:  process.env.access_token_secret,
  timeout_ms:           60*1000  // optional HTTP request timeout to apply to all requests.
}

var T      = new Twit(config);



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
