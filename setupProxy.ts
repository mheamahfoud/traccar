/* eslint-disable import/no-extraneous-dependencies */
const { createProxyMiddleware } :any = require('http-proxy-middleware');
module.exports = (app) => {
  app.use(createProxyMiddleware('/api/socket', { target: `ws://173.249.51.233:8082`, ws: true }));
  app.use(createProxyMiddleware('/api', { target: `http://173.249.51.233:8082` }));
  app.use(createProxyMiddleware('/livevedio', { target: `https://37.224.70.180:18001/artemis/api/video/v2/cameras/previewURLs` }));

};


// import { createProxyMiddleware } from 'http-proxy-middleware';

// const target = 'http://173.249.51.233:8082'; // replace with the URL of your target API

// export default function setupProxy(app: any) {
//   app.use(
//     '/api', // replace with the URL path of your API
//     createProxyMiddleware({
//       target,
//       changeOrigin: true,
//       pathRewrite: {
//         '^/api': '', // remove the '/api' prefix from the forwarded request URL
//       },
//     })
//   );
// }