const express = require('express');
const next = require('next');
const cors = require('cors');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// const chatIndex = require('./pages/chat/index')
// const nextI18NextMiddleware = require('next-i18next/middleware')
// const nextI18next = require('./i18n')

app.prepare().then(() => {
  const server = express();

  server.use(cors());

  server.get('/app', (req, res) => {
    res.redirect('/');
  });

  server.get('/app/th/:threadHash', (req, res) => {
    res.redirect('/');
  });

  server.get('/', (req, res) => app.render(req, res, '/index'));

  server.get('/pk/:publicKey', (req, res) =>
    app.render(req, res, '/index', { publicKey: req.params.publicKey }),
  );

  server.get('*', (req, res) => handle(req, res));

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
