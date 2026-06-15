const fs = require('fs');

async function getMap() {
  try {
    const res = await fetch('https://raw.githubusercontent.com/geohacker/india/master/state/india_telengana.geojson');
    const geojson = await res.json();
    
    // Find Gujarat
    const gujarat = geojson.features.find(f => f.properties.NAME_1 === 'Gujarat');
    if (!gujarat) {
      console.log('Gujarat not found');
      return;
    }
    
    // Extract polygons
    const coords = gujarat.geometry.type === 'MultiPolygon' 
      ? gujarat.geometry.coordinates[0][0] 
      : gujarat.geometry.coordinates[0];
      
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const [x, y] of coords) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
    
    const w = maxX - minX;
    const h = maxY - minY;
    const scale = Math.min(400 / w, 400 / h) * 0.9;
    
    // Simplify path (take every 5th point to reduce size)
    const simplified = coords.filter((_, i) => i % 5 === 0);
    
    const path = simplified.map((p, i) => {
      const px = (p[0] - minX) * scale + 20;
      const py = 400 - ((p[1] - minY) * scale + 20); // flip Y
      return (i === 0 ? 'M' : 'L') + ` ${px.toFixed(1)},${py.toFixed(1)}`;
    }).join(' ') + ' Z';
    
    fs.writeFileSync('gujarat_path.txt', path);
    console.log('Saved to gujarat_path.txt');
  } catch (err) {
    console.error(err);
  }
}
getMap();
