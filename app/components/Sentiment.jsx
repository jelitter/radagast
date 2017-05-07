var React = require('react');
var {connect} = require('react-redux');

export var Sentiment = React.createClass({
    render: function(){
        var score = this.props.twitter.tweets.Score;
        var totalScore = score.score;
        var percentScore = score.score_perc;
        var words = score.words;

        var renderdefault = function() {
            if (score.words > 0){
                return <div>
                    <h3>Sentiment score {totalScore}</h3>
                    <p>{percentScore}% possitive</p>
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

export default connect(state => state)(Sentiment);