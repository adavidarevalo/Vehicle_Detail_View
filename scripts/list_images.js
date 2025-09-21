const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, '..', 'data', 'custom_inventory.json'),
  path.join(__dirname, '..', 'data', 'sedan_inventory.json'),
];

const out = [];

files.forEach(fp => {
  if (!fs.existsSync(fp)) return;
  const raw = fs.readFileSync(fp, 'utf8');
  const json = JSON.parse(raw);
  (json.inventory || []).forEach(car => {
    const url = car.image;
    if (!url) return;
    // try to detect extension
    const m = url.match(/\.([a-zA-Z0-9]+)(?:\?|$)/);
    let ext = m ? m[1].toLowerCase() : 'jpg';
    if (!['jpg','jpeg','png','webp'].includes(ext)) ext = 'jpg';
    const filename = `${car.id}.${ext}`;
    out.push(`${url}\t${filename}`);
  });
});

const outPath = path.join(__dirname, 'images_list.txt');
fs.writeFileSync(outPath, out.join('\n'));
console.log('Wrote', outPath);
