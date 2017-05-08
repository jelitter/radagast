var React = require('react');
var ReactDOM = require('react-dom');
var {connect} = require('react-redux');
var WordcloudAPI = require('WordcloudAPI');


export var Wordcloud = React.createClass({
    render: function(){
        var text = this.props.twitter.tweets.Text;
        var renderWordcloud = function(text) {

            if (text) {
                var processedText = WordcloudAPI.wordcloud(text);
                return processedText.map((elem) => {
                    return(
                            <li className="wcelement" key={elem.index}
                            style={elem.style}>
                            {elem.word}
                            </li>
                    )
                })
            } else {
                return (<div></div>)
            }
        }
        return(
            <div>
                <ul id="wordcloudresults" className="word-cloud">
                    {renderWordcloud(text)}
                </ul>
            </div>
            
        )
    }
})

export default connect(state => state)(Wordcloud)