// var mashapeKey = "D1jk6XoHkpmsh4wd3y1bCHuTr6STp1TqCAPjsnwAtZ6kHUUBay";

var unirest  = require('unirest');
var jsonfile = require('jsonfile')
var st       = require('./stemmer-porter2');
var results  = {}
var warriner = jsonfile.readFileSync('./api/data/warriner-english.json');

jsonfile.spaces = 2;
var file = './api/data/data.json'



function saveData() {
  jsonfile.writeFileSync(file, results);
}

exports.loadData = function() {
  // console.dir(jsonfile.readFileSync(file))
  try {
    results = jsonfile.readFileSync(file);
  } catch (e) {
    console.log("File: ", file)
    console.log("Results: ", results);
    console.log("Error parsing JSON data from file.")
  }
}

exports.removeTopicResults = function(res, text) {

  if (results[text]) {
    delete results[text];
    res.send({
      "status" : "OK",
      "message" : "Cached results removed for topic: " + text
    });
  } else {
    res.send({
      "status" : "ERROR",
      "message" : "No cached results found for topic: " + text
    });
  }
}


exports.getAll = function(res, req) {
  res.send (results);
}

exports.getSentiment = function(res, search, twits) {

  var alltwits = "";
  if (results[search.toLowerCase()]) {
    console.log("Adding more results for: " + search)
  } else {
    console.log("New search topic: " + search)
    results[search.toLowerCase()] = {
      "Score"        : "",
      "Raw Text"     : "",
      "Text"         : "",
      "Stemmed Text" : "",
      "Twits"        : []
    }
  }


  for (let i = 0; i < twits.length; i++) {

    found = false;
    for (let j = 0; j < results[search.toLowerCase()].Twits.length; j++) {
      if (twits[i].id == results[search.toLowerCase()].Twits[j].id ) {
        found = true;
        break;
      }
    }
    if (!found) {
      results[search.toLowerCase()].Twits.push(twits[i]);
    }
  }

  for (let i = 0; i < results[search.toLowerCase()].Twits.length; i++) {
    alltwits += results[search.toLowerCase()].Twits[i].text + " "
  }


  // Removing retweet tag 'RT', New line char, double spaces, #Hashtags, URLs and @mentions.
  var txt = alltwits
    .replace(/\bRT\b|\n|#\S+|https?\:\/\/\S+|\@\w+/g, "")
    .replace(/[^a-zA-Záéíóúàèìòùâêîôûäëïöü\!\?\,\.'\- ]/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();


  var words = txt.split(/\W/);
  var stems = [];
  for (var w in words) {
    stems.push(st.stem(words[w].toLowerCase()));
  }
  var stemmedText = stems.join(' ').replace(/\s{2,}/g, " ").trim();;
  
  results[search]["Score"] = this.getSentimentScore(txt);
  results[search]["Raw Text"] = alltwits
  results[search]["Text"] = txt
  results[search]["Stemmed Text"] = stemmedText
  // results[search]["Twits"] = 


  res.send (results[search.toLowerCase()]);

  saveData();
};


function getSentimentScore(text) {

  var score      = 0,
      score_perc = 0;

  text.replace(/\n/, "")
      .replace(/\r/, "")
      .replace(/\./, "")
      .replace(/\,/, "")
      .replace(/\//, "")
      .replace(/\//, "")
      .replace(/\(/, "")
      .replace(/\)/, "");

  let totalscore      = 0, 
      totalwords = 0,
      words      = text.split(' ');

  words.forEach(function(word) {
    if (warriner[word.toLowerCase()]) {
      totalscore += warriner[word.toLowerCase()];
      totalwords++;
    } else if (warriner[st.stem(word.toLowerCase())]) {
      totalscore += warriner[word.toLowerCase()];
      totalwords++;
    }
  });

  if (totalscore > 0) {
    score = totalscore / totalwords;  // Scores go from 1 to 9
    score_perc = this.toPercent(score);    //  Negative 0%  <---> 100% Positive
  }

  var ret_score = {
    "score"      : score,
    "score_perc" : score_perc,
    "words"      : totalwords
  };

  console.log("Text: " + text + "\n" + JSON.stringify(ret_score));

  return ret_score;
}

function toPercent(n) {
  return Math.round((n*100) / 9, 2);
}

// exports.getSentiment2 = function(txt) {
//   // https://market.mashape.com/loudelement/free-natural-language-processing-service

//   unirest.get("https://loudelement-free-natural-language-processing-service.p.mashape.com/nlp-text/?text=" + txt)
//   .header("X-Mashape-Key", mashapeKey)
//   .header("Accept", "application/json")
//   .end(function (result) {
//     // console.log(result.status, result.headers, result.body);
//     console.log("SEARCH 2:\n" + JSON.stringify(result, null));
//   });
// };


// exports.getSentiment3 = function(txt) {
//   // https://market.mashape.com/bitext/bitext-text-and-sentiment-analysis

//   unirest.post("https://bitext-bitext-sentiment-analysis.p.mashape.com/sentiment/")
//   .header("X-Mashape-Key", mashapeKey)
//   .header("Authorization", "bearer " + mashapeKey)
//   .header("Content-Type", "application/json")
//   .send({"language":"eng","text": txt })
//   .end(function (result) {
//     // console.log(result.status, result.headers, result.body);
//     console.log("SEARCH 3:\n" + JSON.stringify(result, null));
//   });
// };

// exports.getSentiment4 = function(txt) {
//   // https://market.mashape.com/bitext/bitext-text-and-sentiment-analysis

//   unirest.post("https://text-sentiment.p.mashape.com/analyze")
//   .header("X-Mashape-Key", mashapeKey)
//   .header("Content-Type", "application/x-www-form-urlencoded")
//   .header("Accept", "application/json")
//   .send("text=I am not really happy")
//   .end(function (result) {
//     console.log("SEARCH 4:\n" + JSON.stringify(result, null));
//   });
// };

// exports.getSentiment5 = function(txt) {
//   unirest.post("https://mikerlynn-text-tone-v1.p.mashape.com/api/sentiment/v1")
//   .header("X-Mashape-Key", mashapeKey)
//   .header("Content-Type", "application/json")
//   .header("Accept", "application/json")
//   .send({"text": txt })
//   .end(function (result) {
//     console.log("SEARCH 5:\n" + JSON.stringify(result, null));
//   });
// };



// http://api.theysay.io/v1/sentiment?text=how%20cool%20is%20that!&level=sentence