# Nodepop v1.0

## Descripción

Nodepop es una API desarrollada en Node, Express y MongoDB que gestiona una base de datos de anuncios de compra/venta de artículos.  

La API posee las siguientes características:

1. Muestra del listado de artículos en HTML mediante página web en la raíz el sitio, con opciones de filtros de búsqueda, ordenación y limitación de resultados mediante método GET.
2. Listado de artículos en formato JSON con opciones de filtros de búsqueda, ordenación y limitación de resultados mediante método GET.
3. Listado en formato JSON de tags existentes en la base de datos mediante método GET.
4. Creación de anuncios mediante método POST.

## Requisitos previos

Se requiere que el sistema donde se vaya a ejecutar esta API tenga instalado el siguiente software:

- Node para la ejecución del código JavaScript
- npm para la instalación de paquetes de dependencias
- MongoDB para la creación de la base de datos

## Descarga e instalación del proyecto

Para clonar el proyecto e instalar sus dependencias en el sistema, ha de ejecutarse en la consola, dentro del directorio creado para el proyecto, los siguientes comandos:

```bash
git clone https://github.com/Ferveloper/nodepop.git
npm i
```

## Inicialización de la base de datos

Antes de iniciar el servidor, deberá crearse o inicializarse la base de datos mediante el comando

```bash
npm run initdb
```  

Este comando ejecuta el proceso de creación o borrado de la base de datos e inserción de los anuncios iniciales. Por seguridad, incluye una pregunta de confirmación en consola del borrado de la base de datos, que abortará el proceso ante cualquier respuesta distinta de "si".

## Configuración del fichero inicial de anuncios

Puede configurarse la lista inicial de anuncios en el fichero `listings.json` ubicado en la raíz del proyecto. El schema de un anuncio tipo es el siguiente:

```javascript
Schema({
name: String,
forSale: Boolean,
price: Number,
photo: String,
tags: [String]
});
```

Donde:

- `name` es el título del anuncio.
- `forSale` es un valor booleano que indica si el artículo se vende (`true`) o se busca (`false`).
- `price` es el precio del artículo.
- `photo` es el nombre del archivo que muestra la foto del artículo.
- `tags` es el listado de categorías del artículo. Inicialmente se han definido las categorías `mobile`, `motor`, `lifestyle` y `work`, pero pueden crearse nuevas sin provocar errores de código.

## Arranque de la API

Una vez configurada la API, puede arrancarse en modo desarrollo con el comando:

`npm run dev`

Para el arranque en modo producción:

`npm start`

## Instrucciones de uso

_**NOTA:** Los ejemplos mostrados a continuación hacen llamadas a la API desde el sistema local en que que se instaló el proyecto. Para su uso por aplicaciones externas al sistema, deberá sustituirse `http://localhost:3000` por el nombre de dominio que se le haya asignado a la máquina para ser accesible a través de Internet._

### Listado de artículos en HTML

Para visualizar la página HTML que muestra el listado completo de artículos basta acceder con el navegador del sistema a la URL `http://localhost:3000`.  
Si se desea filtrar los artículos, esto se hará mediante petición GET en la query string, siguiendo el siguiente formato:

`http://localhost:3000/?key1=value1&key2=value2&key3=value3...`

Los parámetros aceptados son `name`, `sale`, `price`, `tag`, `skip`, `limit` y `sort`, cuyo uso se describe a continuación:

- `name` indica el nombre del artículo o el comienzo de la palabra del anuncio. No es sensible a mayúsculas.  
**Ejemplo:** `http://localhost:3000/?name=b` devolverá anuncios de `bicicleta` y también de `blackberry`.
- `sale` es un valor `boolean` que indica si el artículo se vende (`true`) o se busca (`false`).
- `price` indica el precio o rango de precio del artículo. Para indicar un precio exacto, basta indicarlo directamente (**Ejemplo:** `http://localhost:3000/?price=50`). Para buscar por rangos de precio, se utiliza el formato `"price=min-max"`, que acepta tres variantes:
  - `"min-max"` mostrará los artículos cuyo precio se encuentre entre `min` y `max` (ambos inclusive).  
  **Ejemplo:** `http://localhost:3000/?price=50-200`
  - `"min-"` mostrará los artículos cuyo precio sea igual o mayor que `min`.  
  **Ejemplo:** `http://localhost:3000/?price=50-`
  - `"-max"` mostrará los artículos cuyo precio sea igual o menor que `max`.  
  **Ejemplo:** `http://localhost:3000/?price=-200`
- `tag` indica la categoría en que se clasifica el artículo. Para buscar por varias categorías, se incluirán varios tags consecutivos.  
**Ejemplo:** `http://localhost:3000/?tag=mobile&tag=lifestyle&tag=work`.  
**NOTA:** Cuando se filtra por varios tags, se mostrarán los artículos que tengan **al menos uno** de los tags indicados en el filtro.
- `skip` indica el número de anuncios iniciales a ignorar a la hora de devolver los resultados filtrados. Este valor resulta útil si se desea mostrar resultados paginados. 
- `limit` indica el número límite de anuncios a devolver. Este valor resulta útil si se desea mostrar resultados paginados.
- `sort` indica el campo del schema por el que se desea ordenar de los resultados recibidos.  
**Ejemplo:** `http://localhost:3000/?sort=name` ordena los resultados alfabéticamente por nombre, mientras que `http://localhost:3000/?sort=price` ordena los resultados por precio de menor a mayor.

### Listado de artículos en formato JSON

Para conectarse directamente a la API y recibir el listado completo de anuncios en formato JSON ha de realizarse una petición GET a la URL `http://localhost:3000/apiv1/listings`.  

Si se desea filtrar los artículos, esto se hará mediante petición GET en la query string, siguiendo el siguiente formato:

`http://localhost:3000/apiv1/listings?key1=value1&key2=value2&key3=value3...`

Los parámetros aceptados son `name`, `sale`, `price`, `tag`, `skip`, `limit`, `sort` y `fields`, cuyo uso se describe a continuación:

- `name` indica el nombre del artículo o el comienzo de la palabra del anuncio. No es sensible a mayúsculas.  
**Ejemplo:** `http://localhost:3000/apiv1/listings?name=b` devolverá anuncios de `bicicleta` y también de `blackberry`.
- `sale` es un valor `boolean` que indica si el artículo se vende (`true`) o se busca (`false`).
- `price` indica el precio o rango de precio del artículo. Para indicar un precio exacto, basta indicarlo directamente (**Ejemplo:** `http://localhost:3000/apiv1/listings?price=50`). Para buscar por rangos de precio, se utiliza el formato `"price=min-max"`, que acepta tres variantes:
  - `"min-max"` devolverá los artículos cuyo precio se encuentre entre `min` y `max` (ambos inclusive).  
  **Ejemplo:** `http://localhost:3000/apiv1/listings?price=50-200`
  - `"min-"` devolverá los artículos cuyo precio sea igual o mayor que `min`.  
  **Ejemplo:** `http://localhost:3000/apiv1/listings?price=50-`
  - `"-max"` devolverá los artículos cuyo precio sea igual o menor que `max`.  
  **Ejemplo:** `http://localhost:3000/apiv1/listings?price=-200`
- `tag` indica la categoría en que se clasifica el artículo. Para buscar por varias categorías, se incluirán varios tags consecutivos.  
**Ejemplo:** `http://localhost:3000/apiv1/listings?tag=mobile&tag=lifestyle&tag=work`.  
**NOTA:** Cuando se filtra por varios tags, se devolverán los artículos que tengan **al menos uno** de los tags indicados en el filtro.
- `skip` indica el número de anuncios iniciales a ignorar a la hora de devolver los resultados filtrados. Este valor resulta útil si se desea recibir resultados paginados. 
- `limit` indica el número límite de anuncios a devolver. Este valor resulta útil si se desea recibir resultados paginados.
- `sort` indica el campo por el que se desea ordenar de los resultados recibidos.  
**Ejemplo:** `http://localhost:3000/apiv1/listings?sort=name` ordena los resultados alfabéticamente por nombre, mientras que `http://localhost:3000/apiv1/listings?sort=price` ordena los resultados por precio de menor a mayor.
- `fields` indica los campos de los anuncios que se desean recibir en los resultados. Para recibir varios campos, se incluirán varios valores `fields` consecutivos.  
**Ejemplo:** `http://localhost:3000/apiv1/listings?fields=name&fields=price` devolverá todos los anuncios, pero sólo con los campos de nombre y precio.

### Listado de tags en formato JSON

Para recibir el listado completo de tags en formato JSON ha de realizarse una petición GET a la URL `http://localhost:3000/apiv1/tags`.

Esta ruta no admite parámetros en la query string. Si se envian, son ignoradas y se procesa la petición de tags de forma normal, sin devolver ningún error.

### Creación de anuncios

Para crear un anuncio e insertarlo en la base de datos ha de realizarse una petición POST a la URL `http://localhost:3000/apiv1`.

Los parámetros aceptados en el body de la petición POST son `name`, `sale`, `price`, `photo`, `tag`. Todos los parámetros son requeridos para poder crear un anuncio con éxito. En caso contrario, la API devolverá un error. Su uso se describe a continuación:

- `name` es el título del anuncio.
- `sale` es un valor booleano que indica si el artículo se vende (`true`) o se busca (`false`).
- `price` es el precio del artículo.
- `photo` es el nombre del archivo que muestra la foto del artículo.
- `tag` indica la categoría en que se clasifica el artículo. Para clasificar el anuncio en varias categorías, se incluirán varios tags consecutivos en el body del POST.  
**Ejemplo:** `tag=mobile&tag=lifestyle&tag=work`

### Formato de respuestas JSON

El formato de resultados para una petición aceptada es el siguiente:

```javascript
{
    "success": true,
    "results": [
        // JSON results
    ]
}
```

Si la petición tiene éxito, `success` será igual a `true` y `results` contendrá un array de resultados en formato JSON, de acuerdo al schema descrito anteriormente. Si, siendo `success` igual a `true`, `results` contuviera un objeto vació, significa que el filtrado de resultados no ha devuelto ningúna documento válido o que se han enviado filtros erróneos que han impedido igualmente devolver algún documento válido.

En caso de error, el formato enviado es el siguiente:

```javascript
{
    "success": false,
    "error": // Error message
}
```

Si se produce un error en la petición, `success` será igual a `false` y se enviará el mensaje de error correspondiente.