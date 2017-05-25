var redux = require('redux');
var thunk = require('redux-thunk').default;
var {searchTweetReducer, userReducer, favouritesReducer, viewReducer} = require('reducers');

export var configure = (initialState = {}) => {
    var reducer = redux.combineReducers({
        user: userReducer,
        twitter: searchTweetReducer,
        favourites: favouritesReducer,
        views: viewReducer
    });

    var store = redux.createStore(reducer, initialState, redux.compose(
        redux.applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));

    return store;
}