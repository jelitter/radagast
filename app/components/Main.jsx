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
            <div data-equalizer="dashboard" data-equalizer-mq="small-6" className="">
                <div className="row small-up-1 medium-up-1 large-up-2">
                    <div className="column small-6 box" data-equalizer-watch="dashboard">
                        <h1 className="small-10 text-center titulo">Radagast</h1>
                        <Search onSearch={this.handleSearch}/>
                    </div>
                    <div className="column small-6 box" data-equalizer-watch="dashboard">
                        <Sentiment score={score}/>
                    </div>
                </div>
                <div className="row small-up-1 medium-up-1 large-up-2">
                    <div className="column small-6 box" data-equalizer-watch="dashboard">
                        <Map/>
                    </div>
                    <div className="column small-6 box" data-equalizer-watch="dashboard">
                        <Wordcloud text={fulltext}/>
                    </div>
                </div> 
            </div>
        )
    }
})

module.exports = Main;