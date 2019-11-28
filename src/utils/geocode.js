const request = require('request')

const geocode = (address, callback) =>{
    const url2 ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZG5ha2hvbmUyMiIsImEiOiJjazJsaWF1emYwN2Y3M25xeGpsdGVqaTB6In0.FF84ObXesU2LNY6d-lFtCw'
    request({url:url2, json:true},(error,response) => {
        if(error){
            callback('Cannot connect to service', undefined)
        }
        else if(response.body.features.length==0){
            callback('Location not found. Try a different search')

        }
        else{
            callback(undefined,{latitude:response.body.features[0].center[1], longitude:response.body.features[0].center[0], location: response.body.features[0].place_name})
        }
    } )
}