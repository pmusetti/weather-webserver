
const weatherForm = document.querySelector('form')//Apunta al formulario
const search = document.querySelector('input')    //Apunta al input text
const locationField = document.querySelector('#locationField')//querySelector('#msg-one')
const resumeField = document.querySelector('#resumeField')
const tempField = document.querySelector('#tempField')
const feelsLikeField = document.querySelector('#feelsLikeField')
const minTempField = document.querySelector('#minTempField')
const maxTempField = document.querySelector('#maxTempField')
const pressField = document.querySelector('#pressField')
const humField = document.querySelector('#humField')
const windSpeedField = document.querySelector('#windSpeedField')
const cloudsField = document.querySelector('#cloudsField')
const sunriseField = document.querySelector('#sunriseField')
const sunsetField = document.querySelector('#sunsetField')
const img = document.querySelector('#icon')
const myLocation = document.querySelector('#myLocation')


//Se utilizara en heroku por tanto se elimina la primer parte de la url http://192.168.1.47:3000
function getForecast(location) {
  console.log(location)
  fetch('/weather/city?address=' + location).then((response) => {
    response.json().then((res) => {
      if (res.error) {
        msg_one.textContent = 'ERROR!'
        msg_two.textContent = res.error
        msg_three.textContent = 'oops!'
      } else {
        locationField.textContent = 'Location: ' + res.data.location
        resumeField.textContent = res.data.resume.toUpperCase()
        tempField.textContent = 'Temperature: ' + res.data.temp
        feelsLikeField.textContent = 'Feels like: ' + res.data.feels_like
        minTempField.textContent = 'Temp min: ' + res.data.temp_min
        maxTempField.textContent = 'Temp max: ' + res.data.temp_max
        pressField.textContent = 'Pressure: ' + res.data.pressure
        humField.textContent = 'Humidity: ' + res.data.humidity
        humField.textContent = 'Wind speed: ' + res.data.wind_speed
        cloudsField.textContent = 'Clouds: ' + res.data.clouds
        sunriseField.textContent = 'Sunrise: ' + res.data.sunrise
        sunsetField = 'Sunset: ' + res.data.sunset
        // img.src = 'http://openweathermap.org/img/wn/' + res.data.icon + '@2x.png'
        img.src = 'https://camo.githubusercontent.com/f422ba9e472321d1107866a3320d77932f393646e40a73ecc8646a1b8a31aeb4/68747470733a2f2f626d63646e2e6e6c2f6173736574732f776561746865722d69636f6e732f76322e302f66696c6c2f636c6561722d6461792e737667'

      }
    })
  })

}



weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()//Evita el comportamiento por defecto que es recargar la pagina.
  const location = search.value
  getForecast(location)
})

myLocation.addEventListener('click', (e) => {
  e.preventDefault()

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  function success(pos) {
    var crd = pos.coords;

    console.log('Your current position is:');
    console.log('Latitude : ' + crd.latitude);
    console.log('Longitude: ' + crd.longitude);
    console.log('More or less ' + crd.accuracy + ' meters.');
    alert('Your location will be calculated with a precision of ' + crd.accuracy + '  meters')
    const location = crd.latitude + ' ' + crd.longitude
    getForecast(location)

  };

  function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  };

  navigator.geolocation.getCurrentPosition(success, error, options);


})
