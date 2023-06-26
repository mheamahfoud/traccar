/* eslint-disable import/no-extraneous-dependencies */
//import { createProxyMiddleware } from 'http-proxy-middleware';
const { createProxyMiddleware }  = require('http-proxy-middleware');
module.exports = (app) => {
  app.use(createProxyMiddleware('/api/socket', { target: `${process.env.REACT_APP_TRUCKGPS_SOCKET_URL}`, ws: true }));
  app.use(createProxyMiddleware('/api', { target: `${process.env.REACT_APP_TRUCKGPS_API_URL}` }));
  
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