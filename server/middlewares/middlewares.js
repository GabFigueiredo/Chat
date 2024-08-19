const cors = require('./cors.js')
const bodyParser = require('./body-parser.js')

const middlewares = [
    cors,           // Middleware de CORS
    bodyParser.json, // Middleware para parsing JSON
    bodyParser.urlencoded, // Middleware para parsing URL-encoded
  ];
  
module.exports = middlewares;
