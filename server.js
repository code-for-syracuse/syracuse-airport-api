const express = require('express');
const utilities = require('./utilities');
const config = require('./config').config;

// Set up Express app.
const app = express();
var server;

exports.start = () => {
    const port = process.argv[2] || process.env.PORT || config.PORT;
    server = app.listen(port);
}
exports.stop = () => {
    server.close();
}
exports.app = app;

// Get all flights.
app.get('/', (req, res) => {
    const match_string = "/flights";
    utilities.getFlightInfo(match_string, req, res);
});

// Get flights by flight number.
app.get('/number/:number', (req, res) => {
    const match_string = `//flight[@flightnumber='${req.params.number}']`;
    utilities.getFlightInfo(match_string, req, res);
});

// Get flights by gate.
app.get('/gate/:gate', (req, res) => {
    const match_string = `//flight[@gate='${req.params.gate}']`;
    utilities.getFlightInfo(match_string, req, res);
});

// Get flights by city.
app.get('/city/:city', (req, res) => {
    const match_string = `//flight[@city='${utilities.formatCity(req.params.city)}']`;
    utilities.getFlightInfo(match_string, req, res);
});

// Get flights by direction.
app.get('/direction/:direction', (req, res) => {
    var match_string = `//flight[@type='${utilities.formatDirection(req.params.direction)}']`;
    utilities.getFlightInfo(match_string, req, res);
});
