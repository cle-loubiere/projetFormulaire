const http = require('http');
const app = require('./app');
const port = process.env.PORT || 5000; //ecoute sur le port precise dans la variable env ou 5000
const server = http.createServer(app);

server.listen(port); //lance le serveur
console.log('Server Launched on port ' + port)