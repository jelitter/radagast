var React = require('react');
var Search = require('Search');
var Sentiment = require('Sentiment');
var Map = require('Map');
var Wordcloud = require('Wordcloud');
var TwitterCall = require('TwitterCall');

var Main = React.createClass({
    getInitialState: function(){
        return {
            fulltext: "",
            score: {},
            user: "default"
        }
    },
    handleSearch: function(busqueda) {
        this.setState({ isSearching : true});
        var _this = this;

        TwitterCall.getTweetData(busqueda).then(function(response){
            _this.setState({
                fulltext: response.Text,
                score: response.Score,
                isSearching: false
            })
        }, function(errorMsg){
            alert(errorMsg);
            _this.setState({isSearching: false})

        });
    },

    render: function(){
        var {score, fulltext} = this.state;

        return(
            <div className="container">
                <div className="container-left">
                    <div className="article">
                        <h3>Search</h3>
                        <pre id="searchresults">
                            <Search onSearch={this.handleSearch}/>
                        </pre>
                    </div>
                    <div className="article">
                        <h3>Sentiment</h3>
                        <pre id="sentimentresults">
                            <Sentiment score={score}/>
                        </pre>
                    </div>
                </div>
                <div className="container-right">
                    <div className="article">
                        <h3>World Map</h3>
                        <Map/>
                    </div>
                    <div className="article">
                        <h3>Word Cloud</h3>
                        <Wordcloud text={fulltext}/>
                    </div>
                </div>
            </div>
        )
    }
})

module.exports = Main;