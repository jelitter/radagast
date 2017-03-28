var React = require('react');

var SearchForm = React.createClass({
    onFormSubmit: function(e) {
        e.preventDefault();

        var busca = this.refs.busqueda.value;

        if(busca.length >0) {
            this.props.onSearch(busca); //handleSearch on Main
        }
    },
    render: function(){
        return(
            <div>
                <form onSubmit={this.onFormSubmit} className="row">
                    <div className="column small-10">
                        <input type="text" ref="busqueda" placeholder="Search tweets"/>
                    </div>
                    <div className="column small-2">
                        <button className="button">Go!</button>
                    </div>
                </form>
            </div>
        )
    }
})

module.exports = SearchForm;