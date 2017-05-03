var React = require('react');
var ReactDOM = require('react-dom');
var WordcloudAPI = require('WordcloudAPI');


var Wordcloud = React.createClass({
    render: function(){
        var { text } = this.props;
        var renderWordcloud = function(text) {

            if (text) {
                var processedText = WordcloudAPI.wordcloud(text);
                return processedText.map((elem) => {
                    return(
                            <li key={elem.index}
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

module.exports=Wordcloud;