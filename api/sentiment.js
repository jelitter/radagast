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
  try {
    results = jsonfile.readFileSync(file);
  } catch (e) {
    console.log("File: ", file)
    console.log("Results: ", results);
    console.log("Error parsing JSON data from file.")
  }
}

exports.removeTopicResults = function(res, text) {

  if (results[text.toLowerCase()]) {
    delete results[text.toLowerCase()];
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
      "Score"          : 0,
      "numberOfTweets" : 0,
      "Raw Text"       : "",
      "Text"           : "",
      "Stemmed Text"   : "",
      "Twits"          : []
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
  
  results[search.toLowerCase()]["Score"] = this.getSentimentScore(txt);
  results[search.toLowerCase()]["numberOfTweets"] = results[search.toLowerCase()].Twits.length;
  results[search.toLowerCase()]["Raw Text"] = alltwits
  results[search.toLowerCase()]["Text"] = txt
  results[search.toLowerCase()]["Stemmed Text"] = stemmedText

  console.log("Sentiment for \"" +search+ "\" is " + results[search.toLowerCase()]["Score"].score_perc + " % possitive.");

  res.send (results[search.toLowerCase()]);

  saveData();
};


exports.getSentimentScore = function(text) {

  text.replace(/\n/, "")
      .replace(/\r/, "")
      .replace(/\./, "")
      .replace(/\,/, "")
      .replace(/\//, "")
      .replace(/\//, "")
      .replace(/\(/, "")
      .replace(/\)/, "");

  var score      = 0,
      thisscore  = 0,
      thisword   = "",
      score_perc = 0,
      totalscore = 0, 
      totalwords = 0,
      words      = text.split(' ');

  for (var w in words) {
    thisword = words[w].toLowerCase();
    if (warriner[thisword]) {
      thisscore = Number(warriner[thisword]);
      totalscore += thisscore;
      totalwords++;
    } else if (warriner[st.stem(thisword)]) {
      thisscore = Number(warriner[st.stem(thisword)]);
      totalscore += thisscore;
      totalwords++;
    }
  };

  if (totalscore > 0) {
    score = totalscore / totalwords;       //  Scores go from 1 to 9
    score_perc = this.toPercent(score);    //  Negative 0%  <---> 100% Positive
  }

  var ret_score = {
    "score"      : Number(score.toFixed(2)),
    "score_perc" : score_perc,
    "words"      : totalwords
  };

  return ret_score;
}

exports.toPercent = function(n) {
  return Number(((n*100) / 9).toFixed(2));
}