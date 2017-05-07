var React = require('react');
import SearchForm from 'SearchForm';
import Favourites from 'Favourites';

var Search = React.createClass({
    render: function(){
        return(
            <div>
                <SearchForm />
                <Favourites />
            </div>
        )
    }
})

module.exports = Search;