// const API_URL = "https://radagast-cit.herokuapp.com/api/v1/twitter/search/?q="
const API_URL = "./api/v1/twitter/search/?q="
// const API_URL = "http://localhost:5000          /api/v1/twitter/search/?q="

$(document).ready(function(){
    $('#textfield').keypress(function(e){
      if(e.keyCode==13)
      $('#butSearch').click();
    });
});

function search() {
	var text = $('#textfield').val();
	$('#searchresults').empty();
	$('#sentimentresults').empty();
	$('#mapresults').empty();
	$('#wordcloudresults').empty();
	$.getJSON(API_URL + text, dataReceived);
}

function dataReceived(data) {

	$('#searchresults').append('<p>Score: '+ data.Score.score_perc + '% possitive</p>');	
	for (let i = 0; i < data.Twits.length; i++) {
		$('#searchresults').append('<p>'+ data.Twits[i].text +'</p>');	
	}


	$('#sentimentresults').append('<p>Results for SENTIMENT:</p>');
	$('#sentimentresults').append('<p>'+ data.Score.score_perc +'% possitive</p>');
	$('#sentimentresults').append('<p>'+ data.Score.score +' score [1 (Negative) to 9 (Possitive)]</p>');
	$('#sentimentresults').append('<p>'+ data.Score.words +' scored words</p>');

	$('#mapresults').append('<p>Results for WORLDMAP</p>');

	// $('#wordcloudresults').append('<p>Results for WORDCLOUD</p>');
	// $('#wordcloudresults').append('<p>'+ data.Text +'</p>');

	wordcloud(data.Text);

	// renderSentiment();
	// renderWorldMap();
	// renderWordCloud();
}


// function renderSentiment(renderWorldMap) {
// 	$('#sentimentresults').append('<p>Results for SENTIMENT: '+ data.Score.score_perc +'</p>');
// }

// function renderWorldMap() {
// 	$('#mapresults').append('<p>Results for WORLDMAP</p>');
// }

// function renderWordCloud() {
// 	$('#wordcloudresults').append('<p>Results for WORDCLOUD</p>');
// 	$('#wordcloudresults').append('<p>'+ data.Text +'</p>');
// }



function wordcloud(text) {
	var classes = ["wc_xsmall","wc_small","wc_xsmall","wc_small","wc_large","wc_xlarge"];
	text = text.split(" ");

	var wordfreqs = {};
	var higher = 0;

	for (var i = 0; i < text.length; i++) {
		thisword = text[i].toLowerCase();
		if (wordfreqs.hasOwnProperty(thisword)) {
			wordfreqs[thisword]++;
			if (higher < wordfreqs[thisword]) {
				higher = wordfreqs[thisword];
			}
		} else {
			wordfreqs[thisword] = 1;
		}
	}

	console.log(wordfreqs);

	$('#wordcloudresults').append('<ul class="word-cloud">');
	
	// for (var i = 0; i < wordfreqs.length; i++) {

	for (var k in wordfreqs) {
		$('#wordcloudresults').append('<li class="wc '+classes[Math.floor(Math.random()*classes.length)]+'">' + k + '</li>');
	}
}
