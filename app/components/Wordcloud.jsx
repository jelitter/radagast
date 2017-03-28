var React = require('react');
var ReactDOM = require('react-dom');
var WordcloudAPI = require('WordcloudAPI');


var Wordcloud = React.createClass({

    componentDidUpdate: function(){
        var {text} = this.props;
        if(text.length > 0) {
            var wordlist = text.split(" ");
            WordcloudAPI.drawcloud(wordlist);
        }
    },
    
    render: function(){
        return(
            <div>
                <h1 className="dashboard-title">Wordcloud</h1>
                <div id="wordcloud-graph"></div>
            </div>
        )
    }
})

module.exports=Wordcloud;