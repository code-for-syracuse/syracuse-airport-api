const createHandler = require("azure-function-express").createAzureFunctionHandler;
const express = require("express");
const xml2js = require('xml2js');
const xpath = require('xml2js-xpath');
const agent = require('follow-redirects').https;

// URL to airport XML file.
const url = 'https://www.syrairport.org/flightdata/data.xml';

const app = express();
// Get all flights.
app.get('/flightinfo/', (req, res) => {
  const match_string = "/flights";
  getFlightInfo(match_string, req, res);
});

// Get flights by flight number.
app.get('/flightinfo/number/:number', (req, res) => {
  const match_string = "//flight[@flightnumber='" + req.params.number + "']";
  getFlightInfo(match_string, req, res);
});

// Get flights by gate.
app.get('/flightinfo/gate/:gate', (req, res) => {
  const match_string = "//flight[@gate='" + req.params.gate + "']";
  getFlightInfo(match_string, req, res);
});

// Get flights by city.
app.get('/flightinfo/city/:city', (req, res) => {
  const match_string = "//flight[@city='" + formatCity(req.params.city) + "']";
  getFlightInfo(match_string, req, res);
});

// Get flights by direction.
app.get('/flightinfo/direction/:direction', (req, res) => {
  var match_string = "//flight[@type='" + formatDirection(req.params.direction) + "']";
  getFlightInfo(match_string, req, res);
});

module.exports = createHandler(app);

// Make request for airport XML and do XPath search.
getFlightInfo = (match_string, req, res) => {
  makeRequest(url)
    .then((response) => {
      try {
        xml2js.parseString(response, (err, json) => {
          if (err) {
            console.log(err);
          }
          const matches = xpath.find(json, match_string);
          if (req.query.callback) {
            res.jsonp(matches);
          } else {
            res.set('Access-Control-Allow-Origin', '*');
            res.json(matches);
          }
        });
      } catch (e) {
        console.log(e);
        res.status(500).send('An error occurred.');
      }
    })
    .catch((error) => {
      console.group(error);
      res.status(500).send('Unable to retrieve flight data');
    });
};

// Utility method to make an HTTP request
makeRequest = (url) => {
  return new Promise((resolve, reject) => {
    agent.get(url, (res) => {
      res.on('error', (error) => {
        reject(error);
      });
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        resolve(body);
      });
    });
  });
};

// Format city names for search.
formatCity = city => decodeURIComponent(city.toUpperCase());

// Format direction string for search.
formatDirection = direction => direction.length == 1 ? direction.toUpperCase() : direction.substring(0, 1).toUpperCase();
