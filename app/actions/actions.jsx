var TwitterCall = require('TwitterCall');

export var addFavourite = (favourite) => {
    return {
        type: 'ADD_FAVOURITE',
        favourite
    };
};

export var removeFavourite = (favourite) => {
    return {
        type: 'REMOVE_FAVOURITE',
        favourite
    };
};

export var setFavourites = (favourites) => {
    return {
        type: 'SET_FAVOURITES',
        favourites
    };
};

export var searchTweets = (searchText) => {
    return {
        type: 'SEARCH_TWEETS',
        searchText
    };
};

export var addUser = (user) => {
    return {
        type: 'ADD_USER',
        user
    };
};

export var setUser = (user) => {
    return {
        type: 'SET_USER',
        user
    }
}

export var getTweets = (searchText) => {
    return {
        type: 'START_SEARCH_TWEETS',
        searchText
    };
};

export var completeGetTweets = (tweets, searchText) => {
    return {
        type: 'COMPLETE_SEARCH_TWEETS',
        tweets,
        searchText
    };
};

export var fetchTweets = (searchText) =>{
    return (dispatch, getState) => {
        dispatch(getTweets(searchText));

        return TwitterCall.getTweetData(searchText).then(function(res) {
            dispatch(completeGetTweets(res, searchText));
        }, function (err) {
            dispatch(completeGetTweets({}, searchText));
        });
    };
};

export var toggleView = (view) => {
    return {
        type: 'TOGGLE_VIEW',
        view
    }
}