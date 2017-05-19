var React = require('react');
var createReactClass = require('create-react-class');
import SearchForm from 'SearchForm';
import Favourites from 'Favourites';

var Search = createReactClass({
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