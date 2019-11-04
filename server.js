const express = require('express');
const utilities = require('./utilities');

// Set up Express app.
const app = express();
var server;
const port = process.argv[3] || 3000;

exports.start = () => {
    server = app.listen(port, console.log(`Example app listening on port ${port}!`));
};
exports.stop = () => {
    server.close();
};
exports.app = app;

// Get all flights.
app.get('/', (req, res) => {
    const match_string = "/flights";
    utilities.getFlightInfo(match_string, req, res);
});

// Get flights by flight number.
app.get('/number/:number', (req, res) => {
    const match_string = "//flight[@flightnumber='" + req.params.number + "']";
    utilities.getFlightInfo(match_string, req, res);
});

// Get flights by gate.
app.get('/gate/:gate', (req, res) => {
    const match_string = "//flight[@gate='" + req.params.gate + "']";
    utilities.getFlightInfo(match_string, req, res);
});

// Get flights by city.
app.get('/city/:city', (req, res) => {
    const match_string = "//flight[@city='" + utilities.formatCity(req.params.city) + "']";
    utilities.getFlightInfo(match_string, req, res);
});

// Get flights by direction.
app.get('/direction/:direction', (req, res) => {
    var match_string = "//flight[@type='" + utilities.formatDirection(req.params.direction) + "']";
    utilities.getFlightInfo(match_string, req, res);
});
