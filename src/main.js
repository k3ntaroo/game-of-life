window.onload = () => {
  const GOL = require('./lib/gol.js');

  const dom = document.getElementById('gol-wrapper');

  const canvas = document.createElement('canvas');
  canvas.id = 'gol';
  canvas.height = window.innerHeight;
  canvas.width  = window.innerWidth;

  dom.appendChild(canvas);

  new GOL(canvas.width, canvas.height, canvas.getContext('2d')).run();
}
