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
sale: Boolean,
price: Number,
photo: String,
tags: [String]
});
```

Donde:

- `name` es el título del anuncio.
- `sale` es un valor booleano que indica si el artículo se vende (`true`) o se busca (`false`).
- `price` es el precio del artículo.
- `photo` es el nombre del archivo que muestra la foto del artículo.
- `tags` es el listado de categorías del artículo. Inicialmente se han definido las categorías `mobile`, `motor`, `lifestyle` y `work`, pero pueden crearse nuevas sin provocar errores de código.

## Arranque de la API

Una vez configurada la API, puede arrancarse en modo desarrollo con el comando:

`npm run dev`

Para el arranque en modo producción:

`npm start`

## Instrucciones de uso

### Listado de artículos en HTML

Para visualizar la página HTML que muestra el listado completo de artículos basta acceder con el navegador a la URL `http://localhost:3000`.  
Si se desea filtrar los artículos, esto se hará mediante petición GET en la query string, siguiendo el siguiente formato:

`http://localhost:3000/?key1=value1&key2=value2&key3=value3...`

Las variables y valores aceptados son los siguientes:

- `name` es una `string` que indica el nombre del artículo o el comienzo de la palabra del anuncio. No es sensible a mayúsculas. **Ejemplo:** `name=b` devolverá nombres como `bicicleta` o `butaca`.
- `sale` es un valor `boolean` que indica si el artículo se vende (`true`) o se busca (`false`).
- `price` es una `string` que indica el precio o rango de precio del artículo. Para indicar un precio exacto, basta indicarlo directamente (**Ejemplo:** `price=50`). Para buscar por rangos de precio, se utiliza el formato `"min-max"`, donde:
  - `"min-max"` mostrará los artículos cuyo precio se encuentre entre `min` y `max` (ambos inclusive).
  - `"min-"` mostrará los artículos cuyo precio sea igual o mayor que `min`.
  - `"-max"` mostrará los artículos cuyo precio sea igual o menor que `max`.
- `tag` es es una `string` que indica la categoría del artículo. Para buscar por varias categorías, se incluirán varios tags consecutivos. **Ejemplo:** `tag=mobile&tag=lifestyle&tag=work`.  
**NOTA:** Cuando se filtra por varios tags, se mostrarán los artículos que tengan al menos uno de los tags indicados en el filtro.
- `skip` indica el número de anuncios iniciales a ignorar a la hora de devolver resultados. Este valor resulta útil si se desea mostrar resultados paginados. 
- `limit` indica el número límite de anuncios a mostrar. Este valor resulta útil si se desea mostrar resultados paginados.
- `sort` indica el campo por el que se desea ordenar de los resultados. **Ejemplo:** `sort=name` ordena los resultados alfabéticamente por el nombre, `sort=price` ordena los resultados por precio de menor a mayor.

### Listado de artículos en formato JSON

Para realizar peticiones a la API
`http://localhost:3000/apiv1/listings?key1=value1&key2=value2&key3=value3...`

### Listado de tags en formato JSON

`http://localhost:3000/apiv1/tags`

### Creación de anuncio

`http://localhost:3000/apiv1`
