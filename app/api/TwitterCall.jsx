var axios = require('axios');

module.exports= {
    getTweetData: function(queryString){
        var encodedQuery = encodeURIComponent(queryString);
        var requestUrl = `/api/v1/twitter/search/?q=${encodedQuery}`;

        return axios.get(requestUrl).then( function(res){ //API success, but data is not guaranteed
            if (res.data.cod && res.data.message) {
                throw new Error(res.data.message); //no data was returned
            } else {
                return res.data; //data returned
            }
        }, function(res){
            throw new Error(res.data.message); //API fails
        });
    }
}