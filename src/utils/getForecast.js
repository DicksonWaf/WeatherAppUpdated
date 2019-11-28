const request= require('request')

const getForecast = (latitude, longitude, location)=>{
    const url = 'https://api.darksky.net/forecast/4455a57ad90b317782034647b6ae8345/'+latitude+','+longitude+'?units=si'
    request({url:url, json:true}, (error,response)=>{
        if(error){
            console.log('Cannot connect to service')
        }else{        
           return{
               temperature: response.body.currently.temperature,
               humidity: response.body.currently.humidity,
               summary: response.body.summary
           }
            
        }
    })
  }