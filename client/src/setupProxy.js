const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/auth',
    createProxyMiddleware({
      // target: 'https://project-scdt.herokuapp.com/',
      target: 'https://port-0-project-scdt-ac2nll0ofal0.sel4.cloudtype.app/',
      //target: 'http://localhost:5000',
      changeOrigin: true,
    }),
  );

  app.use(
    '/board',
    createProxyMiddleware({
      // target: 'https://project-scdt.herokuapp.com/',
      target: 'https://port-0-project-scdt-ac2nll0ofal0.sel4.cloudtype.app/',
      //target: 'http://localhost:5000',
      changeOrigin: true,
    }),
  );

  app.use(
    '/heart',
    createProxyMiddleware({
      // target: 'https://project-scdt.herokuapp.com/',
      target: 'https://port-0-project-scdt-ac2nll0ofal0.sel4.cloudtype.app/',
      //target: 'http://localhost:5000',
      changeOrigin: true,
    }),
  );

  app.use(
    '/profile',
    createProxyMiddleware({
      // target: 'https://project-scdt.herokuapp.com/',
      target: 'https://port-0-project-scdt-ac2nll0ofal0.sel4.cloudtype.app/',
      //target: 'http://localhost:5000',
      changeOrigin: true,
    }),
  );

  app.use(
    '/reply',
    createProxyMiddleware({
      // target: 'https://project-scdt.herokuapp.com/',
      target: 'https://port-0-project-scdt-ac2nll0ofal0.sel4.cloudtype.app/',
      //target: 'http://localhost:5000',
      changeOrigin: true,
    }),
  );

  app.use(
    '/upload',
    createProxyMiddleware({
      // target: 'https://project-scdt.herokuapp.com/',
      target: 'https://port-0-project-scdt-ac2nll0ofal0.sel4.cloudtype.app/',
      //target: 'http://localhost:5000',
      changeOrigin: true,
    }),
  );

  app.use(
    '/user',
    createProxyMiddleware({
      // target: 'https://project-scdt.herokuapp.com/',
      target: 'https://port-0-project-scdt-ac2nll0ofal0.sel4.cloudtype.app/',
      //target: 'http://localhost:5000',
      changeOrigin: true,
    }),
  );

  app.use(
    '/comment',
    createProxyMiddleware({
      // target: 'https://project-scdt.herokuapp.com/',
      target: 'https://port-0-project-scdt-ac2nll0ofal0.sel4.cloudtype.app/',
      //target: 'http://localhost:5000',
      changeOrigin: true,
    }),
  );
};
