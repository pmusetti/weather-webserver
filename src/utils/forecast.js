const request = require('request')
const dailyForecast7 = require('./dailyForecast')
const unixTime = require('./timeConvert')

//FORECAST

// Request a la API de forecast de OpenWewtherMap
//API KEY for OpenWeatherMap = c2c053ae4c5303e99b26955bf8136eb7 (usuario pmusetti)
//Mas info: https://openweathermap.org/api
// Unidades en °C y lenguaje en español units=si&lang=es
// Coordenadas de La Paz, Canelones, Uruguay -34.763715,-56.2241167
//http://api.openweathermap.org/data/2.5/weather?lat=-34.7846357&lon=-56.1996447&units=metric&appid=c2c053ae4c5303e99b26955bf8136eb7


//Esta función toma los datos de latitud y longitud devueltos por la funcion geocode (ver app.js)
//La url es de la api de openweathermap que devuelve datos meteorologicos de las coordenadas dadas. (Mas info: https://openweathermap.org/api)
//json:true es un argumento de request para devolver la respuesta en formato json.
//Si se obtiene un error en la solicitud HTTP, se devuelve un mensaje personalizado 'Unable to connect forecast service!' como 
//parametro error del callback, y data como undefined, pues si hay error en la solicitud, no existen datos.
//Si recibo una respuesta HTTP pero la respuesta es de error, significa que la url tiene algún dato invalido.
//En este caso devuelve un error personalizado 'Unable to find location. Try another address' como parametro error del callback
//y se devuelve undefined como parametro data del callback
//Si no pasa ninguna de las cosas anteriores, se extraen los parametros de interes del json de respuesta y se guardan en 
//el objeto data que sera devuelto como parametro data del callback y el parametro error se devuelve como undefined.

//Para ver el json que devuelve, se puede colocar la siguiente url en un navegador con extension de json formater.

//http://api.openweathermap.org/data/2.5/weather?lat=-34.7846357&lon=-56.1996447&units=metric&appid=c2c053ae4c5303e99b26955bf8136eb7&lang=es
//Para traer los iconos http://openweathermap.org/img/wn/50d@2x.png

//Se utiliza la solicitud oneCall. Ver https://openweathermap.org/api/one-call-api
//ejemplo oneCall: https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,minutely&units=metric&lang=es&appid=c2c053ae4c5303e99b26955bf8136eb7
//ejemplo current: http://api.openweathermap.org/data/2.5/weather?lat=33.44&lon=-94.04&units=metric&lang=es&appid=c2c053ae4c5303e99b26955bf8136eb7

const forecast = (data, callback) => {
  let url = " "
  if (!data.latitud) {
    //url = `https://api.openweathermap.org/data/2.5/weather?q=${data}&units=metric&lang=es&appid=c2c053ae4c5303e99b26955bf8136eb7`
    url = `https://https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,minutely&units=metric&lang=es&appid=c2c053ae4c5303e99b26955bf8136eb7`
  } else {

    //url = `http://api.openweathermap.org/data/2.5/weather?lat=${data.latitud}&lon=${data.longitud}&units=metric&lang=es&appid=c2c053ae4c5303e99b26955bf8136eb7`
    url = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.latitud}&lon=${data.longitud}&exclude=hourly,minutely&units=metric&lang=es&appid=c2c053ae4c5303e99b26955bf8136eb7`
    
  }

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      
      callback('Unable to connect forecast service!', undefined)
    } else if (response.body.cod == '404') {
      callback(response.body.message, undefined)
    } else {
      const amanecer = unixTime(response.body.current.sunrise)
      const atardecer = unixTime(response.body.current.sunset)
      const data = {
        location: response.body.timezone + ', ' + response.body.timezone_offset,
        resume: response.body.current.weather[0].description,
        icon: response.body.current.weather[0].icon,
        temp: response.body.current.temp,
        feels_like: response.body.current.feels_like,
        temp_min: response.body.daily[0].temp.min,
        temp_max: response.body.daily[0].temp.max,
        pressure: response.body.current.pressure,
        humidity: response.body.current.humidity,
        wind_speed: (response.body.current.wind_speed * 3.6).toFixed(2),
        sunrise: amanecer,
        sunset: atardecer,
        day1 : {
          min_temp: response.body.daily[1].temp.min.toFixed(0),
          max_temp: response.body.daily[1].temp.max.toFixed(0),
          resume: response.body.daily[1].weather[0].description,
          icon: response.body.daily[1].weather[0].icon,
          date: response.body.daily[1].sunset

        },
        daily : [{},{},{},{},{},{},{},{}]
        
      }

      for (let i = 0; i < response.body.daily.length -1; i++) {
        data.daily[i].min_temp = response.body.daily[i].temp.min.toFixed(0);
        data.daily[i].max_temp= response.body.daily[i].temp.max.toFixed(0);
        data.daily[i].resume= response.body.daily[i].weather[0].description;
        data.daily[i].icon= response.body.daily[i].weather[0].icon;
        let date = new Date(response.body.daily[i].sunrise)
        data.daily[i].date= date.getDay() + "/" + date.getMonth()+1;
        
      }

      callback(undefined, data)
    }
  })

}

module.exports = forecast

