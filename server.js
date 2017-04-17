// Include required modules.
const xml2js = require('xml2js');
const xpath = require('xml2js-xpath');
const request = require('request');
const express = require('express');
const config = require('./config').config;

// Set up Express app.
const app = express();
var server;

exports.start = () => {
	const port = process.argv[2] || 3000;
	server = app.listen(port);
}
exports.stop = () => {
	server.close();
}
exports.app = app;

// Get all flights.
app.get('/', (req, res) => {
	const match_string = "/flights";
	getFlightInfo(match_string, req, res);
});

// Get flights by flight number.
app.get('/number/:number', (req, res) => {
	const match_string = "//flight[@flightnumber='" + req.params.number + "']";
	getFlightInfo(match_string, req, res);
});

// Get flights by gate.
app.get('/gate/:gate', (req, res) => {
	const match_string = "//flight[@gate='" + req.params.gate + "']";
	getFlightInfo(match_string, req, res);
});

// Get flights by city.
app.get('/city/:city', (req, res) => {
	const match_string = "//flight[@city='" + formatCity(req.params.city) + "']";
	getFlightInfo(match_string, req, res);
});

// Get flights by direction.
app.get('/direction/:direction', (req, res) => {
	var match_string = "//flight[@type='" + formatDirection(req.params.direction) + "']";
	getFlightInfo(match_string, req, res);
});

// Make request for airport XML and do XPath search.
var getFlightInfo = (match_string, req, res) => {
	request(config.URL, (error, response, body) => {
		if (!error && response.statusCode == 200) {
			try {
				xml2js.parseString(body, (err, json) => {
					const matches = xpath.find(json, match_string);
					if(req.query.callback) {
						res.jsonp(matches);
					}
					else {
						res.json(matches);
					}
				});
			}
			catch(e) {
				res.status(500).send('An error occured.');
			}
		}
		else {
			res.status(500).send('Unable to retrieve flight data');
		}
	});
}

// Format city names for search.
var formatCity = city => decodeURIComponent(city.toUpperCase());

// Format direction string for search.
var formatDirection = direction => direction.length == 1 ? direction.toUpperCase() : direction.substring(0,1).toUpperCase();
