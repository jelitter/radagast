var React = require('react');
var SentimentAPI = require('SentimentAPI');

var Sentiment = React.createClass({
    render: function(){
        var {score} = this.props;

        return(
            <div>
                Sentiment score of {score}
            </div>
        )
    }
})

module.exports= Sentiment;