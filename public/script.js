// const API_URL = "https://radagast-cit.herokuapp.com/api/v1/twitter/search/?q="
const API_URL = "http://localhost:5000/api/v1/twitter/search/?q="

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
	$('#searchresults').append("Pre-Got data: " + text);
	$.getJSON(API_URL + text, dataReceived);
}

function dataReceived(data, renderSentiment) {

	$('#searchresults').append('<p>Score: '+ data.Score.score_perc + '</p>');	
	for (let i = 0; i < data.Twits.length; i++) {
		$('#searchresults').append('<p>'+ data.Twits[i].text +'</p>');	
	}


	$('#sentimentresults').append('<p>Results for SENTIMENT: '+ data.Score.score_perc +'</p>');

	$('#mapresults').append('<p>Results for WORLDMAP</p>');

	$('#wordcloudresults').append('<p>Results for WORDCLOUD</p>');
	$('#wordcloudresults').append('<p>'+ data.Text +'</p>');

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