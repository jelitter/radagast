var React = require('react');

var SearchForm = React.createClass({
    onFormSubmit: function(e) {
        e.preventDefault();

        var search = this.refs.searchText.value;

        if(search.length >0) {
            this.props.onSearch(search); //handleSearch on Main
        }
    },
    render: function(){
        return(
            <div>
                <form onSubmit={this.onFormSubmit} className="row">
                    <div>
                        <input type="text" ref="searchText" placeholder="Search tweets"/>
                        <button className="button">Go!</button>
                    </div>
                </form>
            </div>
        )
    }
})

module.exports = SearchForm;