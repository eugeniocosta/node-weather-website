const request = require('request');

const forecast = (lon, lat, callback) => {
  const url = 'https://api.darksky.net/forecast/ee1aaab285b352334aa369e6e0899eff/'+encodeURIComponent(lat)+','+encodeURIComponent(lon)+'?units=si'

  request({ url, json : true}, (error, {body}) => {
    if (error) {
      callback('Unable to connect to the server', undefined)
    } else if (body.error) {
      callback('No location found', undefined)
    } else {
     callback (undefined, {
       temperature : body.currently.temperature,
       rainProb : body.currently.precipProbability*100,
       summary: body.currently.summary})
    }
  })
}

module.exports = forecast
