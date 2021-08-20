# Weather WebApp

### El archivo que inicia el servidor se encuentra en src/app.js

Se utilizan los módulos de express, path y hbs.

### Configuración de express y handlebars.

**Express** es un módulo que simplifica la tarea de servir datos.
**handlebars** es un módulo que permite modificar contenido html de forma dinámica.

```publicFolderPath``` es el directorio donde se encuentran las imágenes, estilos y js del frontend.

```viewPaths ```es el directorio donde se encuentran los archivos de handlebars(.hbs) que se utilizan en lugar de los html tradicionales. Handlebar se utiliza para mostrar páginas con contenido dinámico. Se estructura de forma similar al html tradicional dentro del cual se colocan objetos cuyo contenido será dinámico. Al momento de servir la página, se indica el archivo.hbs y un objeto con pares "clave:valor" que reemplazaran el contenido dinámico.

Ejemplo:
```
//Respuesta inicial.
app.get('',(req, res)=>{
  res.render('index',{
    title: 'Weather App',
    name: 'Pablo Musetti'
  })
})
```
En este caso, cuando el cliente solicita la página inicial, se le devuelve el archivo index.hbs y la matriz 
```
  {
    title:'Weather App',
    name_'Pablo Musetti'
    }
```
El archivo index.hbs contiene entre otras cosas un header con una etiqueta ```<h1></h1>``` dentro de la cual se coloco un objeto de hbs ```{{title}}``` de la siguiente forma:
```
<h1>{{title}}</h1>
``` 

También hay un footer con una etiqueta ```<p></p>``` dentro de la cual hay un objeto de hbs ```{{name}}``` de la siguiente forma:

```<p>Pagina creada por {{name}}</p>```

Estos objetos ```{{title}}``` y ```{{name}}```, tomaran el valor establecido en el par "clave:valor" que se paso junto con el archivo index.hbs. Entonces el header mostrara el titulo "Weather App" y el footer el texto "Página creada por Pablo Musetti"

Este encabezado y footer son comunes a todas las paginas, de modo que cuando se sirven las demás páginas se pasa un nuevo objeto "clave:valor" con las mismas claves pero diferentes valores, esto resulta en que cambian los textos que se mostraran en el frontend.

**NOTA: En este caso particular se hizo con handlebars a modo experimental, pues el header y el footer nunca cambian.**

```partialPaths```
Volviendo al archivo app.js, veremos la declaración de partialPaths dentro de ./templates/partials.
Si observamos el directorio templates, tiene 2 subdirectorios:

partials
views

Dentro de views están los archivos antes mencionados que reemplazan a los tradicionales html.
En este caso tenemos 4 archivos que son index, about, help, error404. Cada uno de estos archivos se sirve según la solicitud del cliente y todos tienen en común en su estructura interna un header y un footer de la forma antes mencionada, de tal manera que cada vez que se llame a uno de estas páginas, serán servidas con un objeto "clave:valor" que modificara el header y footer de forma dinámica.

Este header y footer también son archivos.hbs que es incluyen dentro de index.hbs, about.hbs etc. Por tanto, tenemos un archivo header.hbs y otro footer.hbs que solo tienen estructura de encabezado y pie de pagina respectivamente y se incluyen dentro de las paginas que se sirven. A estos archivos header.hbs y footer.hbs se los conoce como "partials" pues no son una página en si mismos, sinó que se utilizan para formar la parte estática de una pagina, común en todas las páginas pero su contenido será modificado según la página.
Estos archivos parciales se encuentran dentro de templates/partials.
Cuando utilizamos express, hay que indicarle que estamos utilizando handlebars y hay que "registrar" también el uso de archivos parciales.
Esto se hace con las siguientes lineas:
```
hbs.registerPartials(partialPath) //Registro de partials
app.set('view engine','hbs')      //Setup de handlebars en express
app.set('views', viewPaths) //Set el directorio de archivos .hbs
```
Si no se define el directorio de views, por defectos los buscara el directorio llamado views que debe estar en el mismo directorio que el archivo que los llama (app.js). En este caso, como se utilizaron archivos partials, se ordenaron en directorios diferentes dentro de un directorio llamado templates, por lo tanto se definió el directorio views como /templates/views.
```
app.use(express.static(publicFolderPath))
```
Esta linea de código, le indica a express donde buscar los archivos estáticos (css, js, imágenes etc)

Hasta aquí la configuración de express y handlebars.

La aplicación Weather App tendrá 4 páginas.
```
Inicial (index.hbs) donde se podrá obtener información del clima.
About   (about.hbs) donde se encontrará información del autor.
Help    (help.hbs)  donde se encontrará información de ayuda.
Error   (error404.hbs) página que se mostrará si se recibe una petición inesperada.
```
Una vez que se le indica a express donde esta el contenido estático, se debe configurar una respuesta predeterminada para cada petición que se espera. Es decir, al momento de diseñar el sitio, se determina cual será la estructura, y cuales son las peticiónes que el cliente le puede hacer al servidor.
Para cada una de estas peticiones, se debe configurar una respuesta. También se debe configurar una respuesta para todas aquellas peticiones no establecidas. Este es el caso de la pagina de error404. Si el cliente envía una petición que no esta implementada, se devuelve la página de error.

Para el caso de peticiones preestablecidas, se configura una respuesta y finalmente se le indica a express que "escuche" un puerto determinado, al cual esperamos que lleguen las peticiones del cliente.
Las peticiones del cliente son las que vienen en la url luego del numero de puerto.

Ejemplo:
```
192.168.1.47:3000/help
```
En este caso se manda la petición /help. Para este caso se configuró una respuesta y se devolverá la pagina Help.hbs

Cuando el cliente inicialmente accede a la pagina 192.168.1.47:3000/ la petición que llega esta "vacía", esto se considera como la petición inicial y se devuelve la pagina de inicio index.hbs

Dentro de esta página, se encuentran todos los links y botones que envían las peticiones pre-establecidas hacia el servidor. 
Ejemplo:
En la página inicial se encuentra una barra de navegación con 3 botones (Weather, About, Help) común a todas las páginas, los cuales envían al servidor la petición correspondiente ("/", "/about", "/help" respectivamente). De esta manera, cuando se active uno de estos botones, el cliente mandara la solicitud correspondiente al servidor, el cual responderá con la página que corresponda. Esto permite volver a cualquier pagina desde cualquier pagina. Adicionalmente hay un formulario con un botón el cual envía la petición /weather. Hasta aquí, las peticiones que se esperan.
Adicionalmente se configuraron 2 respuesta mas. Una para cuando desde la página help se realice una petición desconocida /help/*. En este caso se devolverá la página de error diciendo que el articulo no se encontró. Y la ultima respuesta es para las peticiones "*" , esto es cualquier cosa que no coincida con las peticiones anteriores. En este caso se devolverá la pagina de error con el mensaje de pagina no encontrada.

Como ya mencionamos todas las páginas tienen una barra de navegación la cual permite navegar entre las distintas páginas, dentro de las cuales solo se muestra información y no se puede interactuar, salvo en la página inicial donde se encuentra un formulario con un campo de entrada y un botón.

**NOTA: Esta pagina fue modificada y solo muestra una vista con los datos del tiempo. Las respuestas a /help /about fueron eliminadas. Tambien fue eliminada la barra de navegación.**

Este formulario permite al usuario ingresar el nombre de una ciudad y obtener los datos del clima para esa ciudad.
Esto funciona de la siguiente manera:
Del lado del cliente, se ingresa un valor en el campo de entrada. Se crea un eventListener en el botón de búsqueda, esto es, cuando sea cliqueado por el usuario, se ejecuta una función que toma el valor que ingresó el usuario en el campo y lo envía al servidor dentro de una url determinada.
```
'http://192.168.1.47:3000/weather?address=' + 'dato ingresado por el usuario'
```
Supongamos que el usuario ingreso 'Montevideo' en el campo de entrada.
Si observamos esta url veremos que después del número de puerto 3000 se agrega lo siguiente:
```
/weather?address=Montevideo
```
Todo lo que esta después del signo '?' es lo que se llama argumento, y es interpretado por el servidor como un objeto "clave:valor" de la siguiente manera {address: 'Montevideo'}

La petición que se hace al servidor es /weather. Sabiendo esto, configuramos el servidor para que al recibir la petición /weather, analice los argumentos y si encuentra la clave address, toma su valor y lo utiliza para obtener los datos del clima, de lo contrario, responde con un error.
Esto se hace en la siguiente función:
```
/Respuesta a /weather
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
```
Con req.query.address, se analiza la respuesta y se obtiene el valor de address.
Si el valor es nulo, se responde un mensaje 'You must provide a address!'
En caso contrario, se utiliza como parámetro de entrada de la función geocode() (ver ./utils/geocode.js), la cual se encarga de traer los datos de latitud y longitud de la ciudad. Si esta función no encuentra las coordenadas de la ciudad devuelve un error, en caso contrario lo utiliza como argumento de la función forecast()(ver ./utils/forecast) la cual se encarga de traer los datos del clima correspondientes a esas coordenadas.

Luego de todo este proceso, el servidor responde al cliente con los datos del clima en forma de matriz de objetos "clave:valor" o bien con un mensaje de error.

Del lado del cliente se recibe esta respuesta y se analiza. (ver ./public/js/app.js)

Si se obtiene un error, se imprime en pantalla el mensaje de error dentro de los tags ```<p></p>``` correspondientes.
Si se obtienen los datos del tiempo, se imprimen en los tags ```<p></p>``` correspondientes.
