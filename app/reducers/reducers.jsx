var uuid = require('node-uuid');

var defaultTweetState = {
    isFetching: false,
    searchText: '',
    tweets: {
        Score: {},
        Text: "",
        Twits: []
    }       
}
export var searchTweetReducer = (state = defaultTweetState , action) => {
    switch (action.type) {
        case 'START_SEARCH_TWEETS':
            return {
                isFetching: true,
                tweets: {
                    Score: {},
                    Text: "",
                    Twits: []
                },
                searchText: action.searchText
            };
        case 'COMPLETE_SEARCH_TWEETS':
            return {
                isFetching: false,
                tweets: action.tweets,
                searchText: action.searchText
            };
        default:
            return state;
    };
};

export var userReducer = (state = 'default', action) => {
    switch (action.type){
        case 'SET_USER':
            return action.user;
        default:
            return state;
    };
};

export var favouritesReducer = (state = [], action) => {
    switch (action.type) {
        case 'REMOVE_FAVOURITE':
            return state.filter((favourite) => {
                var fav = favourite.toLowerCase();
                return !(fav == action.favourite.toLowerCase())
            });
        case 'SET_FAVOURITES':
            return [
                ...state,
                ...action.favourites
            ];
        default:
            return state;
    };
};