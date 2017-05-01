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
                    <div>
                        <input type="text" ref="busqueda" placeholder="Search tweets"/>
                        <button className="button">Go!</button>
                    </div>
                </form>
            </div>
        )
    }
})

module.exports = SearchForm;