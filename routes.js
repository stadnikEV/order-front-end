const path = require('path');

const routes = (app) => {
  app.set('views', path.join(__dirname, 'templates'));
  app.set('view engine', 'ejs');

  app.use((req, res, next) => {
    console.log(req.url);
    next();
  });

  app.get('/driver', (req, res) => {
    res.render('driver');
  });
  app.get('/passenger', (req, res) => {
    res.render('passenger');
  });
  app.get('/', (req, res) => {
    res.render('selection');
  });

  app.use((req, res, next) => {
    const regExp = new RegExp('^.*.(js$|svg$)'); // если запрос файлов, пердать управление следующему middleware(static)
    if (req.url.search(regExp) !== -1) {
      next();
      return;
    }

    res.statusCode = 404;
    res.render('bad-request');
  });
};

module.exports = routes;
