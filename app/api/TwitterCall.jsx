var axios = require('axios');

module.exports= {
    getTweetData: function(queryString){
        var encodedQuery = encodeURIComponent(queryString);
        var requestUrl = `/api/v1/twitter/search/?q=${encodedQuery}`;

        return axios.get(requestUrl).then( function(res){ //API success, but city is not guaranteed
            if (res.data.cod && res.data.message) {
                throw new Error(res.data.message); //no city was returned
            } else {
                return res.data; //city returned, temparature return
            }

        }, function(res){
            throw new Error(res.data.message); //API fails
        });
    }
}