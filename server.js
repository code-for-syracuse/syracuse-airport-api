// Include required modules.
var xml2js = require('xml2js');
var xpath = require('xml2js-xpath');
var request = require('request');
var express = require('express');
var config = require('./config').config;

// Set up Express app.
var app = express();
var server;

exports.start = function () {
	var port = process.argv[2] || 4000;
	server = app.listen(port);
}
exports.stop = function() {
	server.close();
}
exports.app = app;

// Get all flights.
app.get('/', function (req, res) {
	var match_string = "/flights";
	getFlightInfo(match_string, req, res);
});

// Get flights by flight number.
app.get('/number/:number', function (req, res) {
	var match_string = "//flight[@flightnumber='" + req.params.number + "']";
	getFlightInfo(match_string, req, res);
});

// Get flights by gate.
app.get('/gate/:gate', function (req, res) {
	var match_string = "//flight[@gate='" + req.params.gate + "']";
	getFlightInfo(match_string, req, res);
});

// Get flights by city.
app.get('/city/:city', function (req, res) {
	var match_string = "//flight[@city='" + formatCity(req.params.city) + "']";
	getFlightInfo(match_string, req, res);
});

// Get flights by direction.
app.get('/direction/:direction', function (req, res) {
	var match_string = "//flight[@type='" + formatDirection(req.params.direction) + "']";
	getFlightInfo(match_string, req, res);
});

// Make request for airport XML and do XPath search.
function getFlightInfo (match_string, req, res) {
	request(config.URL, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			try {
				xml2js.parseString(body, function(err, json) {
					var matches = xpath.find(json, match_string);
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
function formatCity (city) {
	return decodeURIComponent(city.toUpperCase());
}

// Format direction string for search.
function formatDirection (direction) {
	return direction.length == 1 ? direction.toUpperCase() : direction.substring(0,1).toUpperCase();
}