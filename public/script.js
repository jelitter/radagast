// const API_URL = "https://radagast-cit.herokuapp.com/api/v1/twitter/search/?q="
const API_URL = "./api/v1/twitter/search/?q="
    // const API_URL = "http://localhost:5000          /api/v1/twitter/search/?q="

const IGNORED_WORDS = {
    "about": true,
    "all": true,
    "amp": true,
    "and": true,
    "are": true,
    "been": true,
    "but": true,
    "can": true,
    "could": true,
    "did": true,
    "does": true,
    "for": true,
    "from": true,
    "get": true,
    "had": true,
    "has": true,
    "have": true,
    "her": true,
    "his": true,
    "how": true,
    "http": true,
    "https": true,
    "just": true,
    "let": true,
    "not": true,
    "now": true,
    "our": true,
    "out": true,
    "she": true,
    "should": true,
    "some": true,
    "than": true,
    "that": true,
    "the": true,
    "them": true,
    "then": true,
    "their": true,
    "there": true,
    "they": true,
    "this": true,
    "thx": true,
    "via": true,
    "was": true,
    "what": true,
    "when": true,
    "who": true,
    "will": true,
    "with": true,
    "with": true,
    "would": true,
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
    $.getJSON(API_URL + text, dataReceived);
}

function dataReceived(data) {

    $('#searchresults').append('<p>Score: ' + data.Score.score_perc + '% possitive</p>');
    for (let i = 0; i < data.Twits.length; i++) {
        $('#searchresults').append('<p>' + data.Twits[i].text + '</p>');
    }


    // $('#sentimentresults').append('<p>Results for SENTIMENT:</p>');
    $('#sentimentresults').append('<p>' + data.Score.score_perc + '% possitive</p>');
    $('#sentimentresults').append('<p>' + data.Score.score + ' score [1 (Negative) to 9 (Possitive)]</p>');
    $('#sentimentresults').append('<p>' + data.Score.words + ' scored words</p>');

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



// function wordcloud(text) {
//     var classes = ["wc_xsmall", "wc_small", "wc_large", "wc_xlarge"];
//     text = text.split(" ");

//     var wordfreqs = {};
//     var higher = 0;

//     for (var i = 0; i < text.length; i++) {
//         thisword = text[i].toLowerCase();
//         if (wordfreqs.hasOwnProperty(thisword)) {
//             wordfreqs[thisword]++;
//             if (higher < wordfreqs[thisword]) {
//                 higher = wordfreqs[thisword];
//             }
//         } else {
//             wordfreqs[thisword] = 1;
//         }
//     }

//     console.log(wordfreqs);

//     $('#wordcloudresults').append('<ul class="word-cloud">');

//     // for (var i = 0; i < wordfreqs.length; i++) {

//     for (var k in wordfreqs) {
//         var thisfreq = wordfreqs[k];
//         if (thisfreq < higher / classes.length)
//             continue;
//         var class_index = Math.floor(thisfreq.map(1, higher, 0, classes.length));
//         $('#wordcloudresults').append('<li class="wc ' + classes[class_index] + '">' + k + '</li>');
//     }
// }

function wordcloud(text) {

	var font_multiplier = 10;
    text = text.replace(new RegExp("'s", 'g'), "").split(/[\s\.\,\?\!]/);

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

    var max = 5,
    	min = -5;

    for (var k in wordfreqs) {
        var thisfreq = wordfreqs[k];
        if (thisfreq < 3)
            continue;
        // var class_index = Math.floor(thisfreq.map(1, higher, 0, classes.length - 1));

        // $('#wordcloudresults').append('<li id="li_' + k + '" class="wc ' + classes[class_index] + '">' + k + ' </li>');
        
        let k2 = k.replace(new RegExp("'t", 'g'), "-t").replace(new RegExp("'", 'g'), "");
        console.log("k, k2", k, k2);

        $('#wordcloudresults').append('<li id="li_' + k2 + '" class="wc"> ' + k + ' </li>');
        $('#li_' + k2).css('color', "#" + Math.floor(Math.random() * 0x1000000).toString(16));
        $('#li_' + k2).css('font-size',  ((thisfreq*font_multiplier > 200) ? 120 : thisfreq*font_multiplier) +"px" );
        $('#li_' + k2).css('text-shadow',  "0px 0px 4px Black");
        let angle = Math.floor(Math.random() * (max - min + 1)) + min;
        $('#li_' + k2).css('transform',  "rotate("+ angle +"deg)");
    }
}

Number.prototype.map = function(in_min, in_max, out_min, out_max) {
    return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};