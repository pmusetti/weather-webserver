
const inputLocationField = document.querySelector('form')//Apunta al formulario
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
const sunriseField = document.querySelector('#sunriseField')
const sunsetField = document.querySelector('#sunsetField')
const mainIcon = document.querySelector('#main-icon')
const dayOneIcon = document.querySelector('#icon-day1')
const dayTwoIcon = document.querySelector('#icon-day2')
const dayThreeIcon = document.querySelector('#icon-day3')
const dayfourIcon = document.querySelector('#icon-day4')
const dayFiveIcon = document.querySelector('#icon-day5')
const acc = document.querySelector(".accordion");
const myLocBnt = document.querySelector("#myLoc")


//Se utilizara en heroku por tanto se elimina la primer parte de la url http://192.168.1.47:3000
function getForecast(location) {
  let url = " "
  if (!location.lat){
    url = '/weather/city?address=' + location
  }else{
    url = '/weather/coord?lat=' + location.lat + '&' + 'lon=' + location.lon
  }
  
  fetch(url).then((response) => {
    response.json().then((res) => {
      if (res.error) {
        locationField.textContent = res.error
        tempField.textContent = "oops!"
        feelsLikeField.textContent = 'pruebe otro nombre!'
        mainIcon.src = '/img/confused.png'
        resumeField.textContent = ""


      } else {
        locationField.textContent = res.data.location
        resumeField.textContent = res.data.resume.toUpperCase()
        tempField.textContent = res.data.temp + " ºC"
        feelsLikeField.textContent = 'Sensacion: ' + res.data.feels_like + ' ºC'
        minTempField.textContent = 'Minima: ' + res.data.temp_min + ' ºC'
        maxTempField.textContent = 'Maxima: ' + res.data.temp_max + ' ºC'
        pressField.textContent = 'Presion: ' + res.data.pressure + ' hPa'
        humField.textContent = 'Humedad: ' + res.data.humidity + " %"
        windSpeedField.textContent = 'Velocidad del viento: ' + res.data.wind_speed + " m/s"
        sunriseField.textContent = 'Salida: ' + res.data.sunrise
        sunsetField.textContent = 'Puesta: ' + res.data.sunset
        mainIcon.src = 'http://openweathermap.org/img/wn/' + res.data.icon + '@2x.png'
        dayOneIcon.src = 'http://openweathermap.org/img/wn/' + res.data.icon + '@2x.png'
        dayTwoIcon.src = 'http://openweathermap.org/img/wn/' + res.data.icon + '@2x.png'
        dayThreeIcon.src = 'http://openweathermap.org/img/wn/' + res.data.icon + '@2x.png'
        dayfourIcon.src = 'http://openweathermap.org/img/wn/' + res.data.icon + '@2x.png'
        dayFiveIcon.src = 'http://openweathermap.org/img/wn/' + res.data.icon + '@2x.png'
      }
    })
  })

}

inputLocationField.addEventListener('submit', (e) => {
  e.preventDefault()//Evita el comportamiento por defecto que es recargar la pagina.
  const location = search.value
  var panel = document.querySelector(".panel");
  var acc = document.querySelector(".accordion");

  getForecast(location)
  panel.style.display = "none"
  acc.style.display = "block"
})


myLocBnt.addEventListener('click', (e) => {
  e.preventDefault()
  myLocationForecast()
  var panel = document.querySelector(".panel");
  var acc = document.querySelector(".accordion");
  panel.style.display = "none"
  acc.style.display = "block"
})


myLocationForecast = () => {
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  function success(pos) {
    var crd = pos.coords;

    //alert('Your location will be calculated with a precision of ' + crd.accuracy + '  meters')
    //accuracyField.textContent = 'Accuracy: ' + crd.accuracy + ' meters.'
    const location = {
      lat: crd.latitude,
      lon: crd.longitude
    }
  
    getForecast(location)

  };

  function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  };

  navigator.geolocation.getCurrentPosition(success, error, options);

}
myLocationForecast();


acc.addEventListener("click", (e) => {
  var acc = document.querySelector(".accordion");
  var panel = document.querySelector(".panel");
  panel.style.display = "block"
  acc.style.display = "none"
})

