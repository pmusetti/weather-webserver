const request = require('request')

//GEOCODING
//Geocoding para obtener coordenadas de un lugar por su nombre o viceversa.
//En este caso se consultan las coordenadas de Canelones, Canelnones, Uruguay
//key usuario pmusetti = pk.eyJ1IjoicG11c2V0dGkiLCJhIjoiY2s4cDFrYWp2MDBhbTNlbDl6eGkyaTdkdCJ9.0mJGMFEpGbyCun-zkiFEGw

// const geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/montevideo,uruguay.json?access_token=pk.eyJ1IjoicG11c2V0dGkiLCJhIjoiY2s4cDFrYWp2MDBhbTNlbDl6eGkyaTdkdCJ9.0mJGMFEpGbyCun-zkiFEGw'

//Esta función geocode es llamada desde app.js y se le pasa como argumento una dirección (string) y una funcion callback
//que devuelve (error, data)
//La url es la api de mapbox, la cual devuelve un JSON que contiene entre otras cosas, las coordenadas de 
//la ciudad que se le pasa como parametro.
//las coordenadas se encuentran dentro del JSON de respuesta dentro del body, objeto features, objeto center
//latitud se encuenta en body.features[0].center[1]
//longitud se encuentra en body.features[0].center[0]

//Si se produce un error, por ejemplo por no tener conectividad a internet
//se devuelve un texto personalizado en el parametro error de callback : 'Unable to connect mapbox service!'
//y el parametro 'data' como undefined pues si hay error de conexión, no hay datos para devolver.
//Si recibo un mensaje de respuesta de la pagina, evalúo si es un mensaje de error o es la respuesta que espero
//Si es un mensaje de error, entonces body.features.length === 0. En este caso devuelvo un texto personalizado
// en el parametro error de callback:'Unable to find location' y el parametro 'data' como undefined
// En caso de que no suceda nada de lo anterior, es porque obtuve la respuesta que esperaba. 
// En tal caso, extraigo los datos de interés y los pongo dentro de un objeto 'data' y lo devuelvo como parametro 'data' del callback y 'error' undefined
//Los datos devueltos por esta función son tomados como argumento por la función forecast (ver app.js)

// const geocode = (address, callback)=>{
//   const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoicG11c2V0dGkiLCJhIjoiY2s4cDFrYWp2MDBhbTNlbDl6eGkyaTdkdCJ9.0mJGMFEpGbyCun-zkiFEGw'
//   request({url: url, json: true}, (error, response)=>{
//     if(error){
//       callback('Unable to connect mapbox service!', undefined)

//     }else if(response.body.features.length === 0){
//       callback('Unable to find location', undefined)

//     }else{
//       const data ={
//         latitud: response.body.features[0].center[1],
//         longitud: response.body.features[0].center[0],
//         location: response.body.features[0].place_name
//       }
//       callback(undefined, data)

//     }
//   })
// }

const geocode = (address, callback)=>{
  const url = 'https://api.geoapify.com/v1/geocode/search?text=' + encodeURIComponent(address) +'&apiKey=cf92bd8c57cc47a78a06128662042303'
  request({url: url, json: true}, (error, response)=>{
    if(error){
      callback('Unable to connect mapbox service!', undefined)

    }else if(response.body.features.length === 0){
      callback('Unable to find location', undefined)

    }else{
      const data ={
        latitud: response.body.features[0].properties.lat,
        longitud: response.body.features[0].properties.lon,
        location: response.body.features[0].properties.city + "," + response.body.features[0].properties.state
      }
      callback(undefined, data)

    }
  })
}


module.exports = geocode
