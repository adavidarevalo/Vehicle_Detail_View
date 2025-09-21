const fs = require('fs');
const path = require('path');

function patchFile(fp) {
  if (!fs.existsSync(fp)) return;
  const raw = fs.readFileSync(fp, 'utf8');
  const json = JSON.parse(raw);
  (json.inventory || []).forEach(car => {
    const m = car.image && car.image.match(/([A-Za-z0-9_\-]+)\.(jpg|jpeg|png|webp)(?:\?|$)/i);
    if (m) {
      const idCandidate = car.id || m[1];
      const ext = m[2];
      car.image = `/images/${idCandidate}.${ext}`;
    }
  });
  fs.writeFileSync(fp, JSON.stringify(json, null, 2));
  console.log('Patched', fp);
}

const files = [
  path.join(__dirname, '..', 'data', 'custom_inventory.json'),
  path.join(__dirname, '..', 'data', 'sedan_inventory.json')
];

files.forEach(patchFile);
