const express = require('express');
const app = express();
const bunyan = require('bunyan');
const mongoose = require('mongoose');

const log = bunyan.createLogger({
    name: "express",
    streams: [{
        path: 'logs/express.log',
    }]
});

mongoose.connect(process.env.MONGODB_URL || 'mongodb://mongodb/express-example');

/**
 * Endpoint 1: basic response
 */
app.get('/', (req, res) => {
    log.info("Sending response.");
    res.send('Hello Digio!');
});

/**
 * Endpoint 2: MongoDB connection test
 */
app.get('/mongo', (req, res) => {
    if (mongoose.connection.readyState === 1) {
        const message = "MongoDB is connected.";
        log.info(message)
        res.send(message);
    } else {
        const err = "MongoDB is not connected.";
        log.error(err);
        res.send(err);
    }
});

app.listen(process.env.PORT || 3000, function () {
    log.info('Example app listening on port 3000!');
});
  