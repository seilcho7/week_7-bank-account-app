const http = require('http');
const querystring = require('querystring');

const hostname = "127.0.0.1";
const port = 3000;

const Account = require('./models/accounts');

const server = http.createServer(async (req, res) => {
    console.log(req);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    if (req.url.startsWith("/accounts")) {
        const parts = req.url.split("/");
        const method = req.method;

        if (method === "GET") {
            if (parts.length === 2) {
                const allAccounts = await Account.getAll();
                const accountsJSON = JSON.stringify(allAccounts);
                res.end(accountsJSON);
            } else if (parts.length === 3) {
                const theAccountId = parts[2];
                const theAccount = await Account.getById(theAccountId);
                const accountJSON = JSON.stringify(theAccount);
                res.end(accountJSON);
            } else {
                res.statusCode = 404;
                res.end('Resource not found.');
            }
        } else if (method ==="POST") {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            });
            req.on('end', async () => {
                const parsedBody = querystring.parse(body);
                const newAccountId = await Account.add(parsedBody);
                res.end(`{ 
                    id: ${newAccountId}
                }`)
            });
        }
    }
});

server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`);
});