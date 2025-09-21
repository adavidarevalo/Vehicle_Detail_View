const path = require('path');
const fs = require('fs');

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

exports.show = (req, res) => {
  const id = req.params.id;
  const all = loadAll();
  const car = all.find(c => c.id === id);
  if (!car) return res.status(404).render('404', { url: req.originalUrl });
  res.render('car', { title: car.custom_name || car.model, car });
};
