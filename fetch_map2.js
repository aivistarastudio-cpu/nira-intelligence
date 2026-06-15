const fs = require('fs');

async function getMap() {
  try {
    const res = await fetch('https://raw.githubusercontent.com/geohacker/india/master/state/india_telengana.geojson');
    const geojson = await res.json();
    
    // Find Gujarat
    const gujarat = geojson.features.find(f => f.properties.NAME_1 === 'Gujarat');
    
    // Extract polygons. Gujarat has multiple polygons (islands etc). Let's take the largest one.
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
    // Scale to fit nicely in 400x400 with padding
    const scale = Math.min(380 / w, 380 / h);
    
    const path = coords.map((p, i) => {
      const px = (p[0] - minX) * scale + 10;
      const py = 400 - ((p[1] - minY) * scale + 10); // flip Y
      return (i === 0 ? 'M' : 'L') + ` ${px.toFixed(2)},${py.toFixed(2)}`;
    }).join(' ') + ' Z';
    
    fs.writeFileSync('gujarat_path_highres.txt', path);
    console.log('Saved to gujarat_path_highres.txt. Points:', coords.length);
  } catch (err) {
    console.error(err);
  }
}
getMap();
