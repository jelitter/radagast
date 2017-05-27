var axios = require('axios');

module.exports= {
    getFavs: function(username){
        var encodedQuery = encodeURIComponent(username);
        var requestUrl = `/api/v1/favourites/get/?user=${encodedQuery}`;

        return axios.get(requestUrl).then( function(res){ //API success, but data is not guaranteed
            if (res.data.cod && res.data.message) {
                throw new Error(res.data.message); //no data was returned
            } else {
                return res.data; //data returned
            }
        }, function(res){
            throw new Error(res.data); //API fails
        });
    },
    addFav: function(username, fav) {
        var encodedUser = encodeURIComponent(username);
        var encodedFav = encodeURIComponent(fav);
        var requestUrl = `/api/v1/favourites/add/?user=${encodedUser}&text=${encodedFav}`;
        
        return axios.get(requestUrl).then(function(res){
            if(res.data.cod && res.data.message){
                throw new Error(res.data.message)
            } else {
                return res.data;
            }
        }, function(res) {
            throw new Error(res.data.message)
        })
    },
    removeFav: function(username, fav) {
        var encodedUser = encodeURIComponent(username);
        var encodedFav = encodeURIComponent(fav);
        var requestUrl = `/api/v1/favourites/remove/?user=${encodedUser}&text=${encodedFav}`;

        return axios.get(requestUrl).then(function(res){
            if(res.data.cod && res.data.message){
                throw new Error(res.data.message)
            } else {
                return res.data;
            }
        }, function(res) {
            throw new Error(res.data.message)
        })
    },
    getUser: function() {
        return localStorage.getItem("RadagastUser");
    },
    setUser: function(user) {
        localStorage.setItem("RadagastUser", user);
    },
    saveViews: function(views) {
        localStorage.setItem("RadagastSettings", JSON.stringify(views));
    },
    loadViews: function() {
        return JSON.parse(localStorage.getItem("RadagastSettings"));
    }
}