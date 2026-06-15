const fs = require('fs');
const simplify = require('simplify-js');

async function getMap() {
  const res = await fetch('https://raw.githubusercontent.com/geohacker/india/master/state/india_telengana.geojson');
  const geojson = await res.json();
  const gujarat = geojson.features.find(f => f.properties.NAME_1 === 'Gujarat');
  
  let allCoords = [];
  
  if (gujarat.geometry.type === 'MultiPolygon') {
    for (const poly of gujarat.geometry.coordinates) {
      allCoords.push(poly[0]); // outer ring of each polygon
    }
  } else {
    allCoords.push(gujarat.geometry.coordinates[0]);
  }
    
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const coords of allCoords) {
    for (const [x, y] of coords) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
  
  const w = maxX - minX;
  const h = maxY - minY;
  const scale = Math.min(380 / w, 380 / h);
  
  let fullPath = '';
  let totalPoints = 0;
  
  for (const coords of allCoords) {
    const points = coords.map(p => ({ x: (p[0] - minX) * scale + 10, y: 400 - ((p[1] - minY) * scale + 10) }));
    const simplified = simplify(points, 0.5, true);
    totalPoints += simplified.length;
    
    const path = simplified.map((p, i) => {
      return (i === 0 ? 'M' : 'L') + ` ${p.x.toFixed(1)},${p.y.toFixed(1)}`;
    }).join(' ') + ' Z ';
    fullPath += path;
  }
  
  fs.writeFileSync('gujarat_path_complete.txt', fullPath.trim());
  console.log('Saved COMPLETE map! Polygons:', allCoords.length, 'Points:', totalPoints, 'Length:', fullPath.length);
}
getMap();
