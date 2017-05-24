var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
import Main from 'Main';

//State configuration
var actions = require('actions');
var store = require('configureStore').configure();
var FavCall = require('FavCall');

store.subscribe(() => {
    var state = store.getState();
    if(state.twitter.isfetching) {
        // TODO: Loading icon
    } else if (state.twitter.tweets) {
        // TODO: Loaded icon
    }
});

var user = FavCall.getUser() || "default";
store.dispatch(actions.setUser(user));

FavCall.getFavs(user).then((res) => {
    store.dispatch(actions.setFavourites(res));
});


//styles
require('style!css!sass!applicationStyles');

ReactDOM.render(
    <Provider store = {store}>
        <Router history={hashHistory}>
            <Route path="/" component={Main}></Route>
        </Router>
    </Provider>,
    document.getElementById('app')
)