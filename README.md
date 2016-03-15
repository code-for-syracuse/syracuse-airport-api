# Syracuse Airport Flight Info API

An API for flight data from the Syracuse Hancock International Airport.

## Rationale

The Syracuse Hancock International Airport currently publishes an XML file with flight data that is used on the organization's [public website](http://www.syrairport.org/).

In a way, this is awesome and the data is far easier to use than the data from many other public public organizations. However, this XML file is not as flexible as a full REST API, which would allow for searches by flight number, by gate assignment, etc.

To create a lightweight REST interface on top of the existing airport flight information XML file, this project uses [Node.js](https://nodejs.org/en/) and [XPath](https://www.npmjs.com/package/xml2js-xpath) to parse the XML file and expose search paths that make this data more easily consumed by civic apps.

## Example usage

Get flights by flight number

```curl
~$ curl http://apis.opensyracuse.org/flightinfo/number/2815
```

```json
[
  {
    "$": {
      "type": "A",
      "indicator": "D",
      "airlinecode": "DL",
      "date": "03/05/16",
      "claim": "B2",
      "remarks": "ARRIVED",
      "gate": "24",
      "actualtime": "1653",
      "scheduletime": "1707",
      "city": "ATLANTA",
      "flightnumber": "2815"
    }
  }
]
```

Get flights by gate number

```curl
~$ curl http://apis.opensyracuse.org/flightinfo/gate/20
```

Get flights by city

```curl
~$ curl http://apis.opensyracuse.org/flightinfo/city/toronto
```

Get flights by direction

```curl
~$ curl http://apis.opensyracuse.org/flightinfo/direction/arrival
```
Get all flights

```curl
~$ curl http://apis.opensyracuse.org/flightinfo/
```

Note: JSONP is supported by using a ```callback``` parameter with requests.
