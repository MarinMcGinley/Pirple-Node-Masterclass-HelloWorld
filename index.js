const http = require('http');
const url = require('url');

const httpServer = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    const chosenHandler = typeof(router[trimmedPath]) == 'undefined' ? router['notFound'] : router[trimmedPath];

    chosenHandler((status, payload) => {
        status = typeof(status) == 'number' ? status : 200;

        payloadString = JSON.stringify(payload); 

        res.setHeader('Content-Type', 'application/json');
        res.writeHead(status);
        res.end(payloadString);

    })
});

httpServer.listen(3000, () => {
    console.log('Server is listening on port 3000');
});


const handler = {
};

handler.helloWorld = (cb) => {
    cb(200, {hello: 'world!'});
};

handler.notFound = (cb) => {
    cb(404, {empty: 'response'});
}

const router = {
    'hello': handler.helloWorld,
    'notFound': handler.notFound
};


