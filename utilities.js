const xml2js = require('xml2js');
const xpath = require('xml2js-xpath');
const https = require('https');
const config = require('./config').config;

// Make request for airport XML and do XPath search.
exports.getFlightInfo = (match_string, req, res) => {
    makeRequest(config.URL)
        .then((response) => {
            try {
                xml2js.parseString(response, (err, json) => {
                    if(err) {
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
            res.status(500).send('Unable to retrieve flight data');
        });
}

// Utility method to make an HTTP request
makeRequest = (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
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
exports.formatCity = city => decodeURIComponent(city.toUpperCase());

// Format direction string for search.
exports.formatDirection = direction => direction.length == 1 ? direction.toUpperCase() : direction.substring(0, 1).toUpperCase();
