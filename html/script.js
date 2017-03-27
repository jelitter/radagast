const API_URL = "http://46.7.66.70:3005/api/v1/twitter/search/?q="

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
	$.getJSON(API_URL + text, gotData);
}

function gotData(data) {

	$('#searchresults').append('<p>Score: '+ data.Score + '</p>');	
	for (let i = 0; i < data.Twits.length; i++) {
		$('#searchresults').append('<p>'+ data.Twits[i].text +'</p>');	
	}
	// $('#searchresults').append('<p>'+ JSON.stringify(data)+ '</p>');
	

	$('#sentimentresults').append('<p>Results for SENTIMENT: '+ data.Score +'</p>');
	
	$('#mapresults').append('<p>Results for WORLDMAP</p>');

	$('#wordcloudresults').append('<p>Results for WORDCLOUD</p>');
	$('#wordcloudresults').append('<p>'+ data.Text +'</p>');
}
