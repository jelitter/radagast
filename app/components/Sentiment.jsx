var React = require('react');

var Sentiment = React.createClass({
    render: function(){
        var {score} = this.props;
        var totalScore = score.score;
        var percentScore = score.score_perc;
        var words = score.words;

        var renderdefault = function() {
            if (score.words > 0){
                return <div>
                    <h3>
                        Total sentiment score {totalScore}
                    </h3>
                    <h3>
                        Average {percentScore}
                    </h3>
                    <p>Total words counted: {words}</p>
                </div>
            } else {
                return <div></div>
            }
        }

        return(
            <div>
                <h1>
                   Sentiment Analysis
                </h1>
                {renderdefault()}
            </div>
        )
    }
})

module.exports= Sentiment;