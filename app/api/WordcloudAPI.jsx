// Added proxy to avoid cross domain loading error.
// const PROXY = "https://crossorigin.me/"
// const API_URL = "https://radagast-cit.herokuapp.com/api/v1/twitter/search/?q="

var $ = require('jQuery');

const API_URL = "./api/v1/twitter/search/?q="

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

export var wordcloud = function (text, top=20) {

	const font_multiplier = 10;
    const max_font_size   = 150;
    const min_font_size   = 16;
    const angles          = [0, 2, -2, 5, -5];

    text = text.replace(new RegExp("'s", 'g'), "").split(/[\s\.\,\?\!]/);
    var wordfreqs = {};

    for (var i = 0; i < text.length; i++) {
        var thisword = text[i].toLowerCase();
        if ((thisword.length < 3) || IGNORED_WORDS.hasOwnProperty(thisword) || thisword == text)
            continue;
        if (wordfreqs.hasOwnProperty(thisword)) {
            wordfreqs[thisword]++;
        } else {
            wordfreqs[thisword] = 1;
        }
    }

    if(Object.keys(wordfreqs).length === 0) return [];

    // Extracting top values
    var topValues = [];
    for (var w in wordfreqs) { topValues.push( [wordfreqs[w], w] ); }
    topValues.sort((t1,t2) => { return t2[0] - t1[0] || t2[1] - t1[1] });

    topValues = topValues.slice(0, top);

    // Creating tag clouds using logarithmic interpolation 
    // https://skozan.wordpress.com/2015/10/11/creating-tag-clouds-using-logarithmic-interpolation-in-python/
    var maxcount = topValues[0][0];
    var mincount = topValues[topValues.length - 1][0];
    topValues.forEach((item) => { 
        item[2] = (Math.log(item[0]) - Math.log(mincount)) / (Math.log(maxcount) - Math.log(mincount)); 
    });

    var result = [];

    topValues.forEach((item) => {
        let k = item[1];
        let k2 = k.replace(new RegExp("'t", 'g'), "t").replace(new RegExp("'", 'g'), "");
        let size = (item[2] * max_font_size) | 0;

        if (size >= min_font_size) {
            let angle = angles[Math.floor(Math.random()*angles.length)];
            result.push({
                index: k2,
                style: {
                    "color": '#'+Math.floor(Math.random() * 0x1000000).toString(16),
                    "display" : 'block',
                    "fontSize": size + 'px',
                    "textShadow": '0px 0px 4px Black',
                    "transform" : 'rotate(' + angle + 'deg)'
                }, 
                word: k
            })
        }
    });
    return result;
}



Number.prototype.map2 = function(in_min, in_max, out_min, out_max) {
    return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};