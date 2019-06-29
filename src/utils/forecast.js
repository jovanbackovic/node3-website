const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/b42d55fe9db1df94ef64991d882bf5a6/'+encodeURIComponent(lat)+','+encodeURIComponent(long)+'?units=si'
    request({ url, json: true}, (error, response) => {
        if (error){
            callback(error)
        } else if (response.body.error) {
            callback('Unable to find location')
        } else {
            const {temperature, precipProbability} = response.body.currently
            const res = response.body.daily.data[0].summary +" It is currently "+temperature +" degrees out. There is a " +precipProbability+'%'+ " chance of rain."
            callback(undefined, res)
        }
    })
}

module.exports = forecast