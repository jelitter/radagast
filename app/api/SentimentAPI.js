//     ┌──────────────────┐
//     │ Work in Progress │
//     └──────────────────┘

//var unirest = require('unirest');
var mashapeKey = "D1jk6XoHkpmsh4wd3y1bCHuTr6STp1TqCAPjsnwAtZ6kHUUBay";
var axios = require('axios');

axios.defaults.headers.common['X-Mashape-Key'] = mashapeKey;

module.exports = {
  getSentiment: function(text) {
    var config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      }
    }
    
    return axios.post('https://community-sentiment.p.mashape.com/text/', {'text': text}, config).then(function(res) {
      if (res.data.cod && res.data.message) {
        throw new Error(res.data.message)
      } else {
        return res;
      }
    }, function(res) {

      throw new Error(res.data.message);
    });
  },
  getSentiment2: function(text) {
    var config = {
      headers: {
        'Accept': 'application/json'
      }
    }
    var URL = 'https://loudelement-free-natural-language-processing-service.p.mashape.com/nlp-text/?text='
    var encodedtext = encodeURIComponent(text);
    var requestUrl = `${URL}${encodedtext}`

    return axios.get(requestUrl, config).then(function(res) {
      console.log(res);
      if (res.data.cod && res.data.message) {
        throw new Error(res.data.message)
      } else {
        return res;
      }
    }, function(res) {
      console.log(res);
      throw new Error(res.data.message);
    });
  }

}




// exports.getSentiment = function(txt) {

//   unirest.post("https://community-sentiment.p.mashape.com/text/")
//   .header("X-Mashape-Key", mashapeKey)
//   .header("Content-Type", "application/x-www-form-urlencoded")
//   .header("Accept", "application/json")
//   .send("txt=" + txt)
//   .end(function (result) {
//     // console.log("Score: " + result.body.result.sentiment + " - Confidence: " + result.body.result.confidence);
//     console.log("SEARCH 1:\n" + JSON.stringify(result, null));

//   });
// };


/*


exports.getSentiment3 = function(txt) {
  // https://market.mashape.com/bitext/bitext-text-and-sentiment-analysis

  unirest.post("https://bitext-bitext-sentiment-analysis.p.mashape.com/sentiment/")
  .header("X-Mashape-Key", mashapeKey)
  .header("Authorization", "bearer " + mashapeKey)
  .header("Content-Type", "application/json")
  .send({"language":"eng","text": txt })
  .end(function (result) {
    // console.log(result.status, result.headers, result.body);
    console.log("SEARCH 3:\n" + JSON.stringify(result, null));
  });
};

exports.getSentiment4 = function(txt) {
  // https://market.mashape.com/bitext/bitext-text-and-sentiment-analysis

  unirest.post("https://text-sentiment.p.mashape.com/analyze")
  .header("X-Mashape-Key", mashapeKey)
  .header("Content-Type", "application/x-www-form-urlencoded")
  .header("Accept", "application/json")
  .send("text=I am not really happy")
  .end(function (result) {
    console.log("SEARCH 4:\n" + JSON.stringify(result, null));
  });
};

exports.getSentiment5 = function(txt) {
  unirest.post("https://mikerlynn-text-tone-v1.p.mashape.com/api/sentiment/v1")
  .header("X-Mashape-Key", mashapeKey)
  .header("Content-Type", "application/json")
  .header("Accept", "application/json")
  .send({"text": txt })
  .end(function (result) {
    console.log("SEARCH 5:\n" + JSON.stringify(result, null));
  });
};

*/

// http://api.theysay.io/v1/sentiment?text=how%20cool%20is%20that!&level=sentence