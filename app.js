const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const indexRouter = require('./routes/index');
app.use('/', indexRouter);
const errorController = require('./controllers/errorController');
app.get('/error/500', errorController.trigger);
app.use((req, res) => {
  res.status(404).render('404', { url: req.originalUrl });
});
app.use((err, req, res, next) => {
  console.error(err.stack || err);
  const status = err.status || 500;
  res.status(status).render('500', { error: err, url: req.originalUrl });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
