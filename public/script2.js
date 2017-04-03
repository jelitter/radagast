// Added proxy to avoid cross domain loading error.
// const PROXY = "https://crossorigin.me/"
// const API_URL = "https://radagast-cit.herokuapp.com/api/v1/twitter/search/?q="
const API_URL = "./api/v1/twitter/search/?q="

const IGNORED_WORDS = {
    "amp": true,
    "and": true,
    "are": true,
    "did": true,
    "for": true,
    "from": true,
    "had": true,
    "has": true,
    "her": true,
    "his": true,
    "how": true,
    "http": true,
    "just": true,
    "let": true,
    "not": true,
    "now": true,
    "she": true,
    "that": true,
    "the": true,
    "they": true,
    "this": true,
    "thx": true,
    "via": true,
    "was": true,
    "when": true,
    "who": true,
    "will": true,
    "with": true,
    "you": true
}


$(document).ready(function() {
    $('#textfield').keypress(function(e) {
        if (e.keyCode == 13)
            $('#butSearch').click();
    });
});

function search() {
    var text = $('#textfield').val();
    $('#searchresults').empty();
    $('#sentimentresults').empty();
    $('#mapresults').empty();
    $('#wordcloudresults').empty();
    // $.getJSON(PROXY + API_URL + text, dataReceived);
    $.getJSON(API_URL + text, dataReceived);
}

function dataReceived(data) {

    console.log(data);

    $('#searchresults').append('<p>Score: ' + data.Score.score_perc + '% possitive</p>');
    for (let i = 0; i < data.Twits.length; i++) {
        $('#searchresults').append('<p>' + data.Twits[i].text + '</p>');
    }

    $('#sentimentresults').append('<p>' + data.Score.score_perc + '% possitive</p>');
    $('#sentimentresults').append('<p>' + data.Score.score + ' score [1 (Negative) to 9 (Possitive)]</p>');
    $('#sentimentresults').append('<p>' + data.Score.words + ' scored words</p>');


    $('#mapresults').append('<p>Results for WORLDMAP</p>');

    wordcloud(data.Text);
}


function wordcloud(text) {

	var font_multiplier = 10;
    text = text.split(/\W/);

    var wordfreqs = {};
    var higher = 0;

    for (var i = 0; i < text.length; i++) {
        thisword = text[i].toLowerCase();
        if ((thisword.length < 3) || IGNORED_WORDS.hasOwnProperty(thisword))
            continue;

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

    var max = 7,
    	min = -7;

    for (var k in wordfreqs) {
        var thisfreq = wordfreqs[k];
        if (thisfreq < 3)
            continue;
        // var class_index = Math.floor(thisfreq.map(1, higher, 0, classes.length - 1));

        // $('#wordcloudresults').append('<li id="li_' + k + '" class="wc ' + classes[class_index] + '">' + k + ' </li>');
        $('#wordcloudresults').append('<li id="li_' + k + '" class="wc"> ' + k + ' </li>');
        $('#li_' + k).css('color', "#" + Math.floor(Math.random() * 0x1000000).toString(16));
        $('#li_' + k).css('font-size',  ((thisfreq*font_multiplier > 200) ? 120 : thisfreq*font_multiplier) +"px" );
        $('#li_' + k).css('text-shadow',  "0px 0px 4px Black");
        let angle = Math.floor(Math.random() * (max - min + 1)) + min;
        $('#li_' + k).css('transform',  "rotate("+ angle +"deg)");
    }
}


Number.prototype.map = function(in_min, in_max, out_min, out_max) {
    return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};