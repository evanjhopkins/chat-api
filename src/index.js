require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
/* This 'storageAdapter' require will give us a abstracted method of reading/writing data. The adapter pattern allows us to
theoretically hot-swap different storage methods here. So maybe there is a production adapter (e.g. uses firebase), and then
a development adapter (e.g. some kind of local storage). This can be very useful for things like storage, logging, and lots more!
 */
const storageAdapter = require('./adapters/storage');

const app = express();

// use port specified in env, or fallback to default
const port = process.env.PORT || 3000;

// load express.js json parsing middleware
app.use(bodyParser.json());

// initialize our storage adapter.
storageAdapter.init();

/* Generate routes dynamically from the routes configuration file. By generating the routes this way, we can avoid
repeating the same code over and over again.
 */
routes.forEach(({method, path, handler}) => {
    app[method](path, handler);
});

// start server
app.listen(port, () => {
    console.log(`Chat API running on localhost:${port}`)
});



