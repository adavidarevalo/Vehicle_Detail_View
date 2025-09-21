const fs = require('fs');
const path = require('path');

function loadAll() {
  const dataDir = path.join(__dirname, '..', 'data');
  if (!fs.existsSync(dataDir)) return [];
  const files = fs.readdirSync(dataDir).filter(f => f.endsWith('_inventory.json'))
    .map(f => path.join(dataDir, f));

  return files.reduce((acc, fp) => {
    try {
      const raw = fs.readFileSync(fp, 'utf8');
      const json = JSON.parse(raw);
      return acc.concat(json.inventory || []);
    } catch (e) {
      return acc;
    }
  }, []);
}

exports.getAll = function () {
  return loadAll();
}

exports.getById = function (id) {
  if (!id) return null;
  const all = loadAll();
  return all.find(v => v.id === id) || null;
}
