const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000 //Linea agregada para tomar el puerto de heroku o el 3000

const publicFolderPath = path.join(__dirname, '../public')
const viewPaths = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

hbs.registerPartials(partialPath)
app.set('view engine', 'hbs')
app.set('views', viewPaths)
app.use(express.static(publicFolderPath))

//Respuesta inicial.
app.get('', (req, res) => {
  res.render('index', {
    title: 'SIGNA Weather',
    name: 'Pablo Musetti'

  })
})


//Respuesta a /weather/coord
app.get('/weather/coord', (req, res) => {
  if (!req.query.lat) {
    return res.send({
      error: 'You must provide geographic coordinates!'
    })
  }
  var coord = {
    latitud: req.query.lat,
    longitud: req.query.lon
  }
  forecast(coord, (error, data) => {
    res.send({
      error,
      data
    })
  })
})

//Respuesta a /weather/city
app.get('/weather/city', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide a city name!'
    })
  }
  const address = req.query.address
  forecast(address, (error, data) => {
    res.send({
      error,
      data
    })
  })
})

//Respuesta de error
app.get('*', (req, res) => {
  res.render('error404', {
    title: 'OOPS! ERROR 404',
    msg: 'Page not found',
    name: 'Pablo Musetti',
    img: '/img/confused.png'
  })
})


// Listener del puerto
app.listen(port, () => {
  console.log('Server running in port ' + port)

})
