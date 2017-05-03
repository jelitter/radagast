var React = require('react');
var Search = require('Search');
var Sentiment = require('Sentiment');
var Map = require('Map');
var Wordcloud = require('Wordcloud');
var TwitterCall = require('TwitterCall');
var FavCall = require('FavCall');

var Main = React.createClass({
    getInitialState: function(){
        //GET USER
        var user = 'default';
        return {
            fulltext: "",
            searchedText: "",
            score: {},
            user,
            coords: [{
                lon: 0,
                lat: 0
            }],
            favs: []
        }
    },
    componentWillMount: function(){
        var favs = FavCall.getFavs();
        this.setState({favs});
    },
    handleSearch: function(searchText) {
        this.setState({ isSearching : true});
        var _this = this;

        TwitterCall.getTweetData(searchText).then(function(response){
            _this.setState({
                fulltext: response.Text,
                score: response.Score,
                isSearching: false,
                searchedText : searchText
            });
        }, function(errorMsg){
            alert(errorMsg);
            _this.setState({isSearching: false})

        });
    },
    handleFavourite: function(fav) {
        if(fav) {
            //remove favourite fav
            console.log("Removed favourite ", fav)
            FavCall.removeFav(fav, this.state.user).then(()=>{this.renderFavs()});
        } else {
            var {searchedText} = this.state;
            console.log("Added favourite", searchedText)
            if (searchedText) {
                FavCall.addFav(searchedText, this.state.user).then(()=>{this.renderFavs()})
            }
        }
    },
    renderFavs: function(user) {
        var favs = FavCall.getFavs(this.state.user).then(()=>{
            console.log("favs in render", favs)
            this.setState({favs})
        })
    },

    render: function(){
        var {score, fulltext, coords, favs} = this.state;

        return(
            <div className="container">
                <div className="container-left">
                    <div className="article">
                        <h3>Search</h3>
                        <pre id="searchresults">
                            <Search onSearch={this.handleSearch} onClickFavourite={this.handleFavourite} favs={favs} onRenderFavs={this.renderFavs}/>
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
                        <Map coords={coords}/>
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