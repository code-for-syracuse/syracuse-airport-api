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
                    res.body.should.have.lengthOf(1)
                    done();
                });
        });

        it('Should return valid JSON with GET (city)', (done) => {
            chai.request(server.app)
                .get('/city/philadelphia')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    res.body.should.have.lengthOf(9)
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
                    res.body.should.have.lengthOf(37)
                    done();
                });
        });

        it('Should return valid JSON with GET (gate)', (done) => {
            chai.request(server.app)
                .get('/gate/8')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    res.body.should.have.lengthOf(5)
                    done();
                });
        });

        it('Should return valid JSON with GET (flight number)', (done) => {
            chai.request(server.app)
                .get('/number/4899')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    res.body.should.have.lengthOf(1)
                    done();
                });
        });

        it('Should return an empty array for invalid gate number', (done) => {
            chai.request(server.app)
            .get('/gate/1000')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.lengthOf(0)
                done();
            });
        })

    });

    after(() => {
        server.stop();
    });
});
