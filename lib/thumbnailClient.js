const cote = require('cote');

function createThumbnail(width, height, destination, filename) {
  const requester = new cote.Requester({ name: 'thumbnail generator client'});
requester.send({
  type: 'thumbnail',
  width: width,
  height: height,
  destination: destination,
  filename: filename
}, response => {
  console.log(`Creado thumbnail --> ${response}`, Date.now());
});
}

module.exports = createThumbnail;