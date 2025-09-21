// Ejemplo mínimo de modelo
class ExampleModel {
  constructor() {
    this.items = ['item1', 'item2'];
  }

  all() {
    return this.items;
  }
}

module.exports = new ExampleModel();
