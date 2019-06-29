const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYmFja285MCIsImEiOiJjanhjdnp1OGEwN2M2M29zOGI0bXo2YW05In0.EC6UddiyabuLf6Qj8fscpA&limit=1'
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback(error)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search')
        } else {
            const {features} = response.body
            const {center} = features[0]
            callback(undefined, {
                longitude: center[0],
                latitude: center[1],
                location: features[0].place_name
            })
        }
    })
}

module.exports = geocode

