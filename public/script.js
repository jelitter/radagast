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
    "one": true,
    "over": true,
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
    "whether": true,
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

    $('#sentimentresults').append('<p>' + data.Score.score_perc + '% possitive</p>');
    $('#sentimentresults').append('<p>' + data.Score.score + ' score [1 (Negative) to 9 (Possitive)]</p>');
    $('#sentimentresults').append('<p>' + data.Score.words + ' scored words</p>');

    $('#mapresults').append('<p>Results for WORLDMAP</p>');

    wordcloud(data.Text, 60);
}

function wordcloud(text, top=20) {

	const font_multiplier = 10;
    const max_font_size = 120;
    const min_font_size = 12;
    const maxangle = 5;
    const minangle = -5;

    text = text.replace(new RegExp("'s", 'g'), "").split(/[\s\.\,\?\!]/);
    var wordfreqs = {};

    for (var i = 0; i < text.length; i++) {
        thisword = text[i].toLowerCase();
        if ((thisword.length < 3) || IGNORED_WORDS.hasOwnProperty(thisword))
            continue;
        if (wordfreqs.hasOwnProperty(thisword)) {
            wordfreqs[thisword]++;
        } else {
            wordfreqs[thisword] = 1;
        }
    }

    // Extracting top values
    topValues = [];
    for (var w in wordfreqs) { topValues.push( [wordfreqs[w], w] ); }
    topValues.sort((t1,t2) => { return t2[0] - t1[0] || t2[1] - t1[1] });

    // Creating tag clouds using logarithmic interpolation 
    // https://skozan.wordpress.com/2015/10/11/creating-tag-clouds-using-logarithmic-interpolation-in-python/
    var maxcount = topValues[0][0];
    var mincount = topValues[topValues.length - 1][0];
    topValues.forEach((item) => { 
        item[2] = (Math.log(item[0]) - Math.log(mincount)) / (Math.log(maxcount) - Math.log(mincount)); 
    });

    topValues = topValues.slice(0, top);

    topValues.forEach((item) => {
        let k = item[1];
        let k2 = k.replace(new RegExp("'t", 'g'), "t").replace(new RegExp("'", 'g'), "");
        let size = (item[2] * max_font_size) | 0;
        size = (size.map(mincount, maxcount, min_font_size, max_font_size)) | 0;

        if (size >= min_font_size) {
            $('#wordcloudresults').append('<li id="li_' + k2 + '" class="wc"> ' + k + ' </li>');
            $('#li_' + k2).css('color', "#" + Math.floor(Math.random() * 0x1000000).toString(16));
            $('#li_' + k2).css('font-size',  size +"px" );
            $('#li_' + k2).css('text-shadow',  "0px 0px 4px Black");
            let angle = Math.floor(Math.random() * (maxangle - minangle + 1)) + minangle;
            $('#li_' + k2).css('transform',  "rotate("+ angle +"deg)");
        }
    });
}

Number.prototype.map = function(in_min, in_max, out_min, out_max) {
    return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};