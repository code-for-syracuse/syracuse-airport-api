const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Syracuse Airport flight information API', () => {
	before(() => {
		server.start();
	});

	describe('Tests', () => {

	  it('Should return valid JSON with GET (all flights)', (done) => {
	  	chai.request(server.app)
	  	.get('/')
	  	    .end((err, res) => {
		      res.should.have.status(200);
		      res.should.be.json;
		      res.body.should.be.a('array');
		      res.body.should.have.lengthOf(1);
		      done();
		    });
	  });

	  it('Should return valid JSON with GET (city)', (done) => {
	  	chai.request(server.app)
	  	.get('/city/toronto')
	  	    .end((err, res) => {
		      res.should.have.status(200);
		      res.should.be.json;
		      res.body.should.be.a('array');
		      res.body.should.have.length.above(1);
		      done();
		    });
	  });

	  it('Should return valid JSON with GET (direction)', (done) => {
	  	chai.request(server.app)
	  	.get('/direction/arrival')
	  	    .end((err, res) => {
		      res.should.have.status(200);
		      res.should.be.json;
		      res.body.should.be.a('array');
		      res.body.should.have.length.above(1);
		      done();
		    });
	  });

	  it('Should return valid JSON with GET (gate)', (done) => {
	  	chai.request(server.app)
	  	.get('/gate/5')
	  	    .end((err, res) => {
		      res.should.have.status(200);
		      res.should.be.json;
		      res.body.should.be.a('array');
		      res.body.should.have.length.above(1);
		      done();
		    });
	  });

	  it('Should return valid JSON with GET (flight number)', (done) => {
	  	chai.request(server.app)
	  	.get('/number/4876')
	  	    .end((err, res) => {
		      res.should.have.status(200);
		      res.should.be.json;
		      res.body.should.be.a('array');
		      done();
		    });
	  });

	});

	after(() => {
		server.stop();
	});
});
