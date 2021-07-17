const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const foreCast = require('./utils/forecast')

const app = express();

//define path for express config
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and view locations
app.set('view engine' , 'hbs'); 
app.set('views' , viewPath);
hbs.registerPartials(partialsPath)


console.log(__dirname); //directory of the current file
console.log(__filename); //path of the current file
//console.log(path.join(__dirname,'../public')); // manipulation of paths

// setup to serve static files and directory
app.use(express.static(path.join(__dirname,'../public'))) //helps to customize the server


// app.get('', (req,res) => {
//    res.send('<h1>Weather</h1>') // to serve html 
// })

// app.get('/help' , (req,res) => { // to serve json
//     res.send({
//         name:'Akshita',
//         age:23
//     });
// })


// app.get('/about' , (req,res) => { 
//     res.send('<h1>About</h1>')
// })


app.get('/weather' , (req,res) => {
    if(!req.query.address){
        return res.send({
            error:'Please provide an address' 
        });
    }
    console.log(req.query.address);
    // res.send({
    //     // location:'New Delhi',
    //     location : req.query.address,
    //     address : req.query.address,
    //     forecast:'Partly cloudy , Light Rain'
    // });
    geoCode(req.query.address , (error , {latitude , longitude , location} = {}) => {      
        if(error){
            return res.send({error});
        }
        foreCast(latitude, longitude, (error, forecast) => {
             if(error){
                return res.send({error});
        }
        res.send({
             location : location,
             address : req.query.address,
             forecast: forecast
          })
      })
    })

})

app.get('' , (req,res) => {
    res.render('index' , {
        title : 'Weather App' ,
        name : 'Akshita'
    }) 
    // to render hbs dynamic template to the requester , by this express parses hbs to
    // html and makes sure that requeste gets html as well
    // second argument is the 
})

app.get('/about' , (req,res) => {
    res.render('about' , {
        title : 'About Me' ,
        name : 'Akshita'
    }) 
})

app.get('/help' , (req,res) => {
    res.render('help' , {
        title : 'Help' ,
        msg : 'Help Text',
        name : 'Akshita'
    }) 
})

app.get('/help/*' , (req,res) => {
    res.render('errorPage', {
        title : '404' ,
        errmsg : 'Help Article Not Found',
        name : 'Akshita'  
    })
})

app.get('*' , (req,res) => {
    res.render('errorPage' , {
        title : '404',
        errmsg : 'Page Not Found',
        name : 'Akshita'
    })
})

app.listen(3000 , () => {
    console.log('Server is up on port 3000')

}) // to start and up a server and have it listen up to a specific port
//process of starting up a server is asynchronus process  
