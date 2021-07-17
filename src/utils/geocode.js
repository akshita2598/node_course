const request = require('request');

const geoCode = (address , callback) => {
    const API = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYWtzaGl0YWdhcmdhYmhpIiwiYSI6ImNrcXh5dGJ6ZjBtMzkycG54MHUyYzF5N24ifQ.G8mUNTGJ4obIZ0lfKQERhg&limit=1' ;
    console.log(API);
    request({url:API , json:true}, (error , response) => {
        if(error){
            callback("Unable to connect to location service" , undefined) // undefined as callback has 2 params error and response
        }else if(response.body.features.length === 0){
            callback("Unable to find location. Try again" , undefined) 
        }else{
            callback(undefined,{
            //undefined in the place of errors since we know that we will get a response this time
            latitude : response.body.features[0].center[1],
            longitude : response.body.features[0].center[0],
            location : response.body.features[0].place_name,
        })
      }
    })

}

module.exports = geoCode ; 