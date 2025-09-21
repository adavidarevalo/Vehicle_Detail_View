const path = require('path');
const fs = require('fs');

const DATA_PATH = path.join(__dirname, '..', 'data', 'suv_inventory.json');

function loadData() {
  const raw = fs.readFileSync(DATA_PATH, 'utf8');
  return JSON.parse(raw);
}

exports.index = (req, res) => {
  const data = loadData();
  res.render('custom', { title: 'SUV Gallery', cars: data.inventory });
};
