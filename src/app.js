const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000 //Linea agregada para tomar el puerto de heroku o el 3000

const publicFolderPath = path.join(__dirname, '../public')
const viewPaths = path.join(__dirname, '../templates/views')
const partialPath =  path.join(__dirname, '../templates/partials')

hbs.registerPartials(partialPath)
app.set('view engine','hbs')
app.set('views', viewPaths)
app.use(express.static(publicFolderPath))

//Respuesta inicial.
app.get('',(req, res)=>{
  res.render('index',{
    title: 'SIGNA Weather App',
    name: 'Pablo Musetti'
        
  })
})

//Respuesta a /about
app.get('/about',(req, res)=>{
  res.render('about',{
    title: 'About Me',
    name: 'Pablo Musetti',
    img: "./img/me.jpeg"
  })
})

//Respuesta  a /help
app.get('/help',(req, res)=>{
  res.render('help',{
    title: 'Help',
    msg: 'http://openweathermap.org',
    img: "http://openweathermap.org/img/wn/10d@2x.png",
    name: 'Pablo Musetti'
  })
})

//Respuesta a /weather
app.get('/weather', (req, res)=>{
      if(!req.query.address){
        return res.send({
        error: 'You must provide a address!'
      })
    }
      var city = req.query.address
      geocode(city, (error, data)=>{
        if (error){
          res.send({ error })      
      }else{
        forecast(data.latitud, data.longitud, (error, data) => {
          res.send({
            error,
            data
          })
        })
      }
    })
  })

app.get('/help/*', (req, res)=>{
  res.render('error404', {
    title: 'Page not Found',
    msg: 'Article not found',
    name: 'Pablo Musetti',
    img: '/img/confused.png'
  })

})

//Respuesta de error
app.get('*', (req, res)=>{
  res.render('error404', {
    title: 'OOPS! ERROR 404',
    msg: 'Page not found',
    name: 'Pablo Musetti',
    img: '/img/confused.png'
  })
})





// Listener del puerto
app.listen(port,()=>{
  console.log('Server running in port '+port)

})
