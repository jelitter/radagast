const API_URL = "https://radagast-cit.herokuapp.com/api/v1/twitter/search/?q="

$(document).ready(function(){
    $('#textfield').keypress(function(e){
      if(e.keyCode==13)
      $('#butSearch').click();
    });
});

function search() {
	alert('clicked');
	var text = $('#textfield').val();
	$('#searchresults').empty();
	$('#sentimentresults').empty();
	$('#mapresults').empty();
	$('#wordcloudresults').empty();
	$.getJSON(API_URL + text, gotData);
}

function gotData(data) {
	$('#searchresults').append('<p>Score: '+ data.Score.score_perc + '</p>');	
	for (let i = 0; i < data.Twits.length; i++) {
		$('#searchresults').append('<p>'+ data.Twits[i].text +'</p>');	
	}

	renderSentiment();
	renderWorldMap();
	renderWordCloud();
}


function renderSentiment() {
	$('#sentimentresults').append('<p>Results for SENTIMENT: '+ data.Score.score_perc +'</p>');
}

function renderWorldMap() {
	$('#mapresults').append('<p>Results for WORLDMAP</p>');
}

function renderWordCloud() {
	$('#wordcloudresults').append('<p>Results for WORDCLOUD</p>');
	$('#wordcloudresults').append('<p>'+ data.Text +'</p>');
}