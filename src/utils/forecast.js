const request = require('request');

const foreCast = (latitude , longitude , callback) => {
    const url = `http://api.weatherstack.com/current?access_key=cbc4df5887862ea2db77778c7bd1a06b&query=${latitude},${longitude}&units=m` ;
    console.log(url);
    request({url:url , json:true}, (error , response) => {
        if(error){
            callback("Unable to connect to weather service" , undefined) // undefined as callback has 2 params error and response
        }else if(response.body.error){
            callback("Unable to find location. Try again" , undefined) 
        }else{
            callback(undefined,`${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degrees out. There is ${response.body.current.precip}% chance of rain.`
            //undefined in the place of errors since we know that we will get a response this time       
        )
      }
    })

}

module.exports = foreCast ; 