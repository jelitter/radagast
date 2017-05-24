var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var createReactClass = require('create-react-class');

export var SearchForm = createReactClass({
    onFormSubmit: function(e) {
        var {dispatch, searchText} = this.props;
        e.preventDefault();

        var search = this.refs.searchText.value;
        if(search.length >0) {
            dispatch(actions.fetchTweets(search));
        }
    },
    render: function(){
        var { searchText } = this.props;
        return(
            <div>
                <form onSubmit={this.onFormSubmit} className="row">
                    <div>
                        <input type="text" id="inputBox" ref="searchText" placeholder="Search tweets">{ searchText }</input>
                        <button className="button">Go!</button>
                    </div>
                </form>
            </div>
        )
    }
})

export default connect(state => state)(SearchForm);