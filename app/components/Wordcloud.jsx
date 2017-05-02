var React = require('react');
var ReactDOM = require('react-dom');
var WordcloudAPI = require('WordcloudAPI');


var Wordcloud = React.createClass({



    componentDidUpdate: function(){
        var { text } = this.props;

        console.log("text", JSON.stringify(text));

        if(text) {
            WordcloudAPI.wordcloud(text);
        }
    },
    
    render: function(){
        var { text } = this.props;
        var renderWordcloud = function(text) {

            if (text) {
                var processedText = WordcloudAPI.wordcloud(text);
                console.log(processedText);
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