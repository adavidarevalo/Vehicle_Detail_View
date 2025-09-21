const path = require('path');
const fs = require('fs');

const DATA_PATH = path.join(__dirname, '..', 'data', 'custom_inventory.json');

function loadData() {
  const raw = fs.readFileSync(DATA_PATH, 'utf8');
  return JSON.parse(raw);
}

exports.index = (req, res) => {
  const data = loadData();
  res.render('custom', { title: 'Custom Gallery', cars: data.inventory });
};

exports.show = (req, res) => {
  const id = req.params.id;
  const data = loadData();
  const car = data.inventory.find(c => c.id === id);
  if (!car) return res.status(404).render('404', { url: req.originalUrl });
  res.render('car', { title: car.custom_name || car.model, car });
};
