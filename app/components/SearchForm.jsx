var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

export var SearchForm = React.createClass({
    onFormSubmit: function(e) {
        var {dispatch, searchText} = this.props;
        e.preventDefault();

        var search = this.refs.searchText.value;
        if(search.length >0) {
            dispatch(actions.fetchTweets(search));
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

export default connect(state => state)(SearchForm);