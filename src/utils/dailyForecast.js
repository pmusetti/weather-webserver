const request = require('request')
const unixTime = require('./timeConvert')


const dailyForecast7 = (data, callback) => {
  let url = " "
  if (!data.latitud) {
    url = `https://api.openweathermap.org/data/2.5/onecall?q=${data}&units=metric&lang=es&appid=c2c053ae4c5303e99b26955bf8136eb7`
  } else {

    url = `http://api.openweathermap.org/data/2.5/onecall?lat=${data.latitud}&lon=${data.longitud}&exclude=current,minutely,hourly&units=metric&lang=es&appid=c2c053ae4c5303e99b26955bf8136eb7`
  }

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect forecast service!', undefined)
    } else if (response.body.cod == '404') {
      callback(response.body.message, undefined)
    } else {
      console.log(response.body)
      const data = {
        
      }
      callback(undefined, data)
    }
  })

}

module.exports = dailyForecast7

