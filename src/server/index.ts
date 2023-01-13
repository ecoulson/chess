import http from 'http';
import fs from 'fs';
import path from 'path';

const mimeTypes: Record<string, string> = {
    js: 'text/javascript',
    css: 'text/css',
    html: 'text/html',
    ico: 'image/vnd.microsoft.icon',
};

const server = http.createServer((request, response) => {
    if (!request.url) {
        return response.end();
    }
    const extension = path.basename(request.url).split('.')[1] ?? 'html';
    response.writeHead(200, {
        'Content-Type': mimeTypes[extension],
    });
    if (request.url === '/') {
        return fs.createReadStream('./public/index.html').pipe(response);
    }
    if (request.url.startsWith('/dist/')) {
        return fs.createReadStream('.' + request.url).pipe(response);
    }
    return fs.createReadStream('./public' + request.url).pipe(response);
});

server.listen(8080);
