const cote = require('cote');
const jimp = require('jimp');

const responder = new cote.Responder({ name: 'thumbnail generator responder'});

responder.on('thumbnail', async (req, done) => {
  console.log(`Servicio - Ruta: ${req.destination}${req.filename}, Ancho: ${req.width}px, Alto: ${req.height}px, ${Date.now()}`);
  const image = await jimp.read(`${req.destination}/${req.filename}`)
  await image.cover(req.width, req.height);
  const dotIndex = req.filename.lastIndexOf('.');
  const name = req.filename.substring(0, dotIndex);
  const ext = req.filename.substring(dotIndex, req.filename.length);
  const thumbnailName = `${name}-thumbnail_${req.width}x${req.height}${ext}`;
  image.write(`${req.destination}/thumbnails/${thumbnailName}`)
  done(thumbnailName);
});