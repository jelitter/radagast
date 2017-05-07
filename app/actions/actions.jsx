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
            console.log("inside gettweets action:", searchText)
    return {
        type: 'START_SEARCH_TWEETS',
        searchText
    };
};

export var completeGetTweets = (tweets, searchText) => {
    console.log("inside completetweets action:", searchText)
    return {
        type: 'COMPLETE_SEARCH_TWEETS',
        tweets,
        searchText
    };
};

export var fetchTweets = (searchText) =>{
    return (dispatch, getState) => {
        console.log("inside fetch:", searchText)
       dispatch(getTweets(searchText));

        TwitterCall.getTweetData(searchText).then(function(res) {
            var tweets = res;
            dispatch(completeGetTweets(tweets, searchText));
        });
    };
};