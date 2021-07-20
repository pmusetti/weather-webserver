const weatherForm = document.querySelector('form')//Apunta al formulario
const search = document.querySelector('input')    //Apunta al input text
const msg_1 = document.querySelector('#msg-01')//querySelector('#msg-one')
const msg_2 = document.querySelector('#msg-02')
const msg_3 = document.querySelector('#msg-03')
const msg_4 = document.querySelector('#msg-04')
const msg_5 = document.querySelector('#msg-05')
const msg_6 = document.querySelector('#msg-06')
const msg_7 = document.querySelector('#msg-07')
const msg_8 = document.querySelector('#msg-08')
const msg_9 = document.querySelector('#msg-09')
const msg_10 = document.querySelector('#msg-10')
const msg_11 = document.querySelector('#msg-11')
const msg_12 = document.querySelector('#msg-12')
const img = document.querySelector('#icon')
const myLocation = document.querySelector('#myLocation')


//Se utilizara en heroku por tanto se elimina la primer parte de la url http://192.168.1.47:3000
function getForecast(location) {
  console.log(location)
  fetch('/weather?address=' + location).then((response) => {
    response.json().then((res) => {
      if (res.error) {
        msg_one.textContent = 'ERROR!'
        msg_two.textContent = res.error
        msg_three.textContent = 'oops!'
      } else {
        msg_1.textContent = 'Location: ' + res.data.location
        msg_2.textContent = res.data.resume.toUpperCase()
        msg_3.textContent = 'Temperature: ' + res.data.temp
        msg_4.textContent = 'Feels like: ' + res.data.feels_like
        msg_5.textContent = 'Temp min: ' + res.data.temp_min
        msg_6.textContent = 'Temp max: ' + res.data.temp_max
        msg_7.textContent = 'Pressure: ' + res.data.pressure
        msg_8.textContent = 'Humidity: ' + res.data.humidity
        msg_9.textContent = 'Wind speed: ' + res.data.wind_speed
        msg_10.textContent = 'Clouds: ' + res.data.clouds
        msg_11.textContent = 'Sunrise: ' + res.data.sunrise
        msg_12.textContent = 'Sunset: ' + res.data.sunset
        img.src = 'http://openweathermap.org/img/wn/' + res.data.icon + '@2x.png'

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
  };

  function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  };

  navigator.geolocation.getCurrentPosition(success, error, options);
  alert("my location is ")
})
