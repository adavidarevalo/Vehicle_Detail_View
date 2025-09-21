exports.index = (req, res) => {
  res.render('index', { title: 'Inicio', message: 'Bienvenido a Express MVC' });
};
