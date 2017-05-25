var React = require('react');
var createReactClass = require('create-react-class');
import SearchForm from 'SearchForm';
import Favourites from 'Favourites';
import Views from 'Views';

var Search = createReactClass({
    render: function(){
        return(
            <div>
                <SearchForm />
                <Favourites />
                <Views />
            </div>
        )
    }
})

module.exports = Search;