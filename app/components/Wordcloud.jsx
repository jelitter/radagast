var React = require('react');
var ReactDOM = require('react-dom');
var WordcloudAPI = require('WordcloudAPI');


var Wordcloud = React.createClass({
<<<<<<< HEAD
=======



    componentDidUpdate: function(){
        var { text } = this.props;

        // console.log("text", JSON.stringify(text));

        if(text) {
            WordcloudAPI.wordcloud(text);
        }
    },
    
>>>>>>> f5a99f206116c5b0010b507170b29603d8409d0b
    render: function(){
        var { text } = this.props;
        var renderWordcloud = function(text) {

            if (text) {
                var processedText = WordcloudAPI.wordcloud(text);
<<<<<<< HEAD
=======
                // console.log(processedText);
>>>>>>> f5a99f206116c5b0010b507170b29603d8409d0b
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