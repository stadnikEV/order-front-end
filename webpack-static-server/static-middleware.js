const path = require('path');

const staticMiddleware = (app) => {
  app.set('views', path.join(__dirname, 'templates'));
  app.set('view engine', 'ejs');

  app.get('/', (req, res) => {
    res.render('page');
  });

  app.use((req, res, next) => {
    const regExp = new RegExp('^.*.(js)');
    if (req.url.search(regExp) !== -1) {
      next();
      return;
    }

    res.statusCode = 404;
    res.render('page-not-found');
  });
};

module.exports = staticMiddleware;
