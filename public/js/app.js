
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
const myLocBnt = document.querySelector("#myLoc");

const day1_temp = document.querySelector("#temp-day1");
const day1_resume = document.querySelector("#forecast-day1");
const day1_icon = document.querySelector("#icon-day1");
const day1_date = document.querySelector("#date-day1");

const day2_temp = document.querySelector("#temp-day2");
const day2_resume = document.querySelector("#forecast-day2");
const day2_icon = document.querySelector("#icon-day2");
const day2_date = document.querySelector("#date-day2");

const day3_temp = document.querySelector("#temp-day3");
const day3_resume = document.querySelector("#forecast-day3");
const day3_icon = document.querySelector("#icon-day3");
const day3_date = document.querySelector("#date-day3");

const day4_temp = document.querySelector("#temp-day4");
const day4_resume = document.querySelector("#forecast-day4");
const day4_icon = document.querySelector("#icon-day4");
const day4_date = document.querySelector("#date-day4");

const day5_temp = document.querySelector("#temp-day5");
const day5_resume = document.querySelector("#forecast-day5");
const day5_icon = document.querySelector("#icon-day5");
const day5_date = document.querySelector("#date-day5");



//Se utilizara en heroku por tanto se elimina la primer parte de la url http://192.168.1.47:3000
function getForecast(location) {
  let url = " "
  if (!location.lat) {
    url = '/weather/city?address=' + location
  } else {
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
        windSpeedField.textContent = 'Viento: ' + res.data.wind_speed + " m/s"
        sunriseField.textContent = 'Salida: ' + res.data.sunrise
        sunsetField.textContent = 'Puesta: ' + res.data.sunset
        mainIcon.src = 'http://openweathermap.org/img/wn/' + res.data.icon + '@2x.png'
        dayOneIcon.src = 'http://openweathermap.org/img/wn/' + res.data.icon + '@2x.png'
        dayTwoIcon.src = 'http://openweathermap.org/img/wn/' + res.data.icon + '@2x.png'
        dayThreeIcon.src = 'http://openweathermap.org/img/wn/' + res.data.icon + '@2x.png'
        dayfourIcon.src = 'http://openweathermap.org/img/wn/' + res.data.icon + '@2x.png'
        dayFiveIcon.src = 'http://openweathermap.org/img/wn/' + res.data.icon + '@2x.png'

        day1_temp.textContent = res.data.daily[0].min_temp + "/" + res.data.daily[0].max_temp + "ºC"
        day1_resume.textContent = res.data.daily[0].resume
        day1_icon.src = 'http://openweathermap.org/img/wn/' + res.data.daily[0].icon + '@2x.png'
        day1_date.textContent = res.data.daily[0].date

        day2_temp.textContent = res.data.daily[1].min_temp + "/" + res.data.daily[1].max_temp + "ºC"
        day2_resume.textContent = res.data.daily[1].resume
        day2_icon.src = 'http://openweathermap.org/img/wn/' + res.data.daily[1].icon + '@2x.png'
        day2_date.textContent = res.data.daily[1].date

        day3_temp.textContent = res.data.daily[2].min_temp + "/" + res.data.daily[2].max_temp + "ºC"
        day3_resume.textContent = res.data.daily[2].resume
        day3_icon.src = 'http://openweathermap.org/img/wn/' + res.data.daily[2].icon + '@2x.png'
        day3_date.textContent = res.data.daily[2].date

        day4_temp.textContent = res.data.daily[3].min_temp + "/" + res.data.daily[3].max_temp + "ºC"
        day4_resume.textContent = res.data.daily[3].resume
        day4_icon.src = 'http://openweathermap.org/img/wn/' + res.data.daily[3].icon + '@2x.png'
        day4_date.textContent = res.data.daily[3].date

        day5_temp.textContent = res.data.daily[4].min_temp + "/" + res.data.daily[4].max_temp + "ºC"
        day5_resume.textContent = res.data.daily[4].resume
        day5_icon.src = 'http://openweathermap.org/img/wn/' + res.data.daily[4].icon + '@2x.png'
        let fecha = new Date(res.data.daily[4].date)
        day5_date.textContent = fecha.getDate()

        
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

