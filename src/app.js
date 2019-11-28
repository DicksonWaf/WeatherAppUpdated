const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const request = require('request')


app.use(express.static(path.join(__dirname, '../public')))
const viewPath= path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)
//setup handlebars template engine
app.set('view engine', 'hbs')
app.set('views', viewPath)


const geocode = (address, callback) =>{
    const url2 ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZG5ha2hvbmUyMiIsImEiOiJjazJsaWF1emYwN2Y3M25xeGpsdGVqaTB6In0.FF84ObXesU2LNY6d-lFtCw'
    request({url:url2, json:true},(error,response) => {
        if(error){
            callback('Cannot connect to service', undefined)
        }
        else if(response.body.features.length==0){
            callback('Location not found. Try a different search', undefined)

        }
        else{
            callback(undefined,{latitude:response.body.features[0].center[1], longitude:response.body.features[0].center[0], location: response.body.features[0].place_name})
        }
    })
}


const getForecast = (response, callback)=>{
    latitude = response.latitude
    longitude = response.longitude
    location = response.location
    const url = 'https://api.darksky.net/forecast/4455a57ad90b317782034647b6ae8345/'+latitude+','+longitude+'?units=si'
    request({url:url, json:true}, (error,response)=>{
        if(error){
            callback('Cannot connect to service', undefined)
        }else{        
           callback(undefined, {
            temperature: response.body.currently.temperature,
            humidity: response.body.currently.humidity,
            summary: response.body.hourly.summary,
            location: location
        
           })
                          
        }
    })
  }



app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather app'
    })
})
app.get('/about', (req,res)=>{
    res.render('about',{
        title: 'About page'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help'
    })
})
app.get('/weather',(req, res)=>{
    if(!req.query.address){
        res.send({
           error: "you must provide an address"
        })
    
    }
    else{
    geocode(req.query.address, (error, response)=>{
        if(error){
            return res.send({
                error 
            })
        }
        getForecast(response, (error, response)=>{
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                response
            })
        })
    })
}
    
})

// error 404 pages
app.get('/help/*',(req,res)=>{
    res.send("Page not found")
})
app.get('/about/*',(req,res)=>{
    res.send("Page not found")
})

app.get('*',(req,res)=>{
    res.send("Page not found")
})

app.listen(3000, ()=>{
    console.log("Server up on port 3000")
})

