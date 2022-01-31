const express = require('express');
const path = require('path');
const app = express();
const url = require('url');
const proxy = require('express-http-proxy');

const PROXY_URL = 'https://boiling-anchorage-83800.herokuapp.com/api';

const apiProxy = proxy(PROXY_URL, {
    proxyReqPathResolver: req => url.parse(req.originalUrl).path
});
app.use('/api/*', apiProxy);

const staticFileMiddleware = express.static(path.join(__dirname, '/public'));
app.use(staticFileMiddleware);

app.get('*', function(req,res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`http://localhost:${port}/`)
});
