const fs = require('fs');
const simplify = require('simplify-js');

async function getMap() {
  const res = await fetch('https://raw.githubusercontent.com/geohacker/india/master/state/india_telengana.geojson');
  const geojson = await res.json();
  const gujarat = geojson.features.find(f => f.properties.NAME_1 === 'Gujarat');
  
  let maxLen = 0;
  let coords = [];
  
  if (gujarat.geometry.type === 'MultiPolygon') {
    for (const poly of gujarat.geometry.coordinates) {
      if (poly[0].length > maxLen) {
        maxLen = poly[0].length;
        coords = poly[0];
      }
    }
  } else {
    coords = gujarat.geometry.coordinates[0];
  }
    
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const [x, y] of coords) {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  
  const w = maxX - minX;
  const h = maxY - minY;
  const scale = Math.min(380 / w, 380 / h);
  
  // Convert to points
  const points = coords.map(p => ({ x: (p[0] - minX) * scale + 10, y: 400 - ((p[1] - minY) * scale + 10) }));
  
  // Simplify! Tolerance of 0.5 usually gives a great balance.
  const simplified = simplify(points, 0.5, true);
  
  const path = simplified.map((p, i) => {
    return (i === 0 ? 'M' : 'L') + ` ${p.x.toFixed(1)},${p.y.toFixed(1)}`;
  }).join(' ') + ' Z';
  
  fs.writeFileSync('gujarat_path_perfect.txt', path);
  console.log('Saved perfect map! Points:', simplified.length, 'Length:', path.length);
}
getMap();
