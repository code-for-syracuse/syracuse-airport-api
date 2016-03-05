# Syracuse Airport Flight Info API

An API for flight data from the Syracuse Hancock International Airport.

## Example usage

Get flights by flight number

```
~$ http://apis.opensyracuse.org/flightinfo/number/2815
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

```
~$ http://apis.opensyracuse.org/flightinfo/gate/20
```

Get flights by city

```
~$ http://apis.opensyracuse.org/flightinfo/city/toronto
```

Get flights by direction

```
~$ http://apis.opensyracuse.org/flightinfo/direction/arrival
```
Get all flights

```
~$ http://apis.opensyracuse.org/flightinfo/
```
