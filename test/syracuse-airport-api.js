var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);

describe('Syracuse Airport flight information API', function () {
	before(function () {
		server.start();
	});

	describe('Tests', function() {

	  it('Should return valid JSON with GET (all flights)', function(done) {
	  	chai.request(server.app)
	  	.get('/')
	  	    .end(function(err, res){
		      res.should.have.status(200);
		      res.should.be.json;
		      res.body.should.be.a('array');
		      res.body.should.have.lengthOf(1);
		      done();
		    });
	  });

	  it('Should return valid JSON with GET (city)', function(done) {
	  	chai.request(server.app)
	  	.get('/city/toronto')
	  	    .end(function(err, res){
		      res.should.have.status(200);
		      res.should.be.json;
		      res.body.should.be.a('array');
		      res.body.should.have.length.above(1);
		      done();
		    });
	  });

	  it('Should return valid JSON with GET (direction)', function(done) {
	  	chai.request(server.app)
	  	.get('/direction/arrival')
	  	    .end(function(err, res){
		      res.should.have.status(200);
		      res.should.be.json;
		      res.body.should.be.a('array');
		      res.body.should.have.length.above(1);
		      done();
		    });
	  });

	  it('Should return valid JSON with GET (gate)', function(done) {
	  	chai.request(server.app)
	  	.get('/gate/6')
	  	    .end(function(err, res){
		      res.should.have.status(200);
		      res.should.be.json;
		      res.body.should.be.a('array');
		      res.body.should.have.length.above(1);
		      done();
		    });
	  });

	  it('Should return valid JSON with GET (flight number)', function(done) {
	  	chai.request(server.app)
	  	.get('/number/4876')
	  	    .end(function(err, res){
		      res.should.have.status(200);
		      res.should.be.json;
		      res.body.should.be.a('array');
		      done();
		    });
	  });	  

	});

	after(function () {
		server.stop();
	});
});