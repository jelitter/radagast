var React = require('react');
var Search = require('Search');
var createReactClass = require('create-react-class');
var {connect} = require('react-redux');
import Sentiment from 'Sentiment';
import Map from 'Map';
import Wordcloud from 'Wordcloud';

export var Main = createReactClass({
    render: function(){
        var {views} = this.props;
        return(
            <div className="container">
                <div className="container-left">
                    <div className="article">
                        <h3>Search</h3>
                        <pre id="searchresults">
                            <Search />
                        </pre>
                    </div>
                    <div className="article" hidden={!views.sentiment}>
                        <h3>Sentiment</h3>
                        <pre id="sentimentresults">
                            <Sentiment />
                        </pre>
                    </div>
                </div>
                <div className="container-right">
                    <div className="article" hidden={!views.map}>
                        <h3>World Map</h3>
                        <Map />
                    </div>
                    <div className="article" hidden={!views.wordcloud}>
                        <h3>Word Cloud</h3>
                        <Wordcloud />
                    </div>
                </div>
            </div>
        )
    }
})

export default connect(state => state)(Main);