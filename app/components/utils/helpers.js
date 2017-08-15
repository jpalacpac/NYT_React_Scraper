import axios from 'axios';

var helpers = {

    // this function being called on the Search component file and beign passed in the input values to build the query url below
    searchNYT: (searchTopic, startYear, endYear) => {

        var nytAPI = '4b6fc51a0f5043d1bc0c4dfeb85c76cf';
        
        // build the query url for the new york times api
        var queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${nytAPI}&q=${searchTopic}&begin_date=${startYear}0101&end_date=${endYear}0101`;

        // ajax call to the new york times articles search api using axios
        return axios.get(queryURL)
            .then( (nytdata) => {

                // store the articles returned in a variable
                var articles = nytdata.data.response.docs;

                // map through the array and build an object for each article that holds the data we need to pass back to the Search component
                var articles_obj_array = articles.map( (article) => {
                    var articlesObj = {
                        title: article.title,
                        date: article.date,
                        url: article.url
                    };
                    return articlesObj;
                });

                // return the object to have access to it on the .then callback in the Search component
                return articles_obj_array;

        }); // end axios.get()

    } // end searchNYT()
};

// We export the helpers object (which contains runQuery)
export default helpers;