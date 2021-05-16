const request = require('postman-request')


const forcast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=7fac114b370297220c575d0b380c168d&query=" + latitude + "," + longitude + "&units=m"
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to get the data", undefined)
        }
        else if (body.error) {
            callback("Error occured while fetching weather details", undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degress out. It feels like " + body.current.feelslike + " degress out")
        }
    })
}

module.exports = forcast