/*const EventEmitter = require ('events');

let listener = new EventEmitter();

listener.on('jump', function () {
    console.log('Okay, I\'ll jump');
});

listener.emit('jump');*/

let http = require('http');
let fs = require ('fs');
let url = require('url');

http.createServer(function (request, response) {
    response.writeHead(200);
    let query = url.parse(request.url, true).query;
    let name = !query.name ? 'anonyme' : query.name;

/*    if(!query.name) {
        response.write('Bonjour anonyme');
    } else {
        response.write('Bonjour ' + query.name);
    }
    response.end();*/

    fs.readFile('index.html', 'utf-8', function (err, data) {
        if (err) {
            response.writeHead(404);
            response.end('Ce fichier n\'existe pas');
        } else {
            response.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            });
            data = data.replace('{{name}}', name);
            response.end(data);
        }
    });
}).listen(8081);
