var React = require('react');
var SearchForm = require('SearchForm');
var Favourites = require('Favourites');

var Search = React.createClass({
    render: function(){
        return(
            <div>
                <SearchForm onSearch={this.props.onSearch}/>
                <Favourites/>
            </div>
        )
    }
})

module.exports = Search;