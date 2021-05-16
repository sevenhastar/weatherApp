const request = require('postman-request')


const geoLocation = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1Ijoia2FjY2h5IiwiYSI6ImNrZzRqaDZjbDBrZzMycXBqbXZjejg4OXoifQ.56Ph_QsRCUrXXYexdPgRhQ"
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to get the data", undefined)
        }
        else if (body.error) {
            callback("Error occured while fetching weather details", undefined)
        } else if(body.features.length > 0) {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        } else {
            callback("Error occured while fetching weather details", undefined)
        }
    })
}

module.exports = geoLocation