const request = require('request')
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
const forecast = (latitud, longitud , callback)=>{
    
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&units=metric&lang=es&appid=c2c053ae4c5303e99b26955bf8136eb7`
  request({url: url, json: true}, (error, response)=>{
    if(error){
      callback('Unable to connect forecast service!', undefined)

    }else if(response.body.error){
      callback('Unable to find location. Try another address', undefined)

    }else{
      const amanecer = unixTime(response.body.sys.sunrise)
      const atardecer = unixTime(response.body.sys.sunset)
      const data ={
        location: response.body.name + ', ' + response.body.sys.country,
        resume: response.body.weather[0].description,
        icon: response.body.weather[0].icon,
        temp: response.body.main.temp + '°C',
        feels_like: response.body.main.feels_like + '°C',
        temp_min: response.body.main.temp_min + '°C',
        temp_max: response.body.main.temp_max + '°C',
        pressure: response.body.main.pressure + 'hPa',
        humidity: response.body.main.humidity + '%',
        wind_speed: response.body.wind.speed + 'km/h',
        clouds: response.body.clouds.all + '%',
        sunrise: amanecer ,
        sunset:  atardecer
        
      }
       callback(undefined, data)

    }
  })

}



module.exports = forecast

