const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  console.log("123213213213");
  app.use(proxy('/admin', { 
       target: 'http://127.0.0.1:8070' ,
       secure: false,
       changeOrigin: true,
       pathRewrite: {
        "^/admin": "/"
       },
    }));
};