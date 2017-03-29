var React = require('react');
var SentimentAPI = require('SentimentAPI');

var Sentiment = React.createClass({
    render: function(){
        var {score} = this.props;
        var totalScore = score.score;
        var percentScore = score.score_perc;
        var words = score.words;

        return(
            <div>
                <h1>
                   Sentiment Analysis (PH)
                </h1>
                <h3>
                    Total sentiment score {totalScore}
                </h3>
                <h3>
                    Average {percentScore}
                </h3>
                <p>Total words counted: {words}</p>
            </div>
        )
    }
})

module.exports= Sentiment;