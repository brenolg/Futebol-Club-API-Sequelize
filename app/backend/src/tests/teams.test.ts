import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http') ;
import { app } from '../app';
import Teams from '../database/models/teams';
import teams from './mocks/teams';
const {expect} = chai

chai.use(chaiHttp);

describe('Testes Teams', () => {

  describe('GET /teams', () => {
    it('deve retornar um status 200', async () => {
      sinon.stub(Teams, 'findAll').resolves(teams);
      const httpResponse = await chai
        .request(app)
        .get('/teams/1');

        expect(httpResponse.status).to.be.equal(200);
        expect(httpResponse.body).to.be.deep.equal(teams);
    })
  })

  describe('GET /teams/:id', () => {

    describe('caso o id informado não for encontrado', () => {

      afterEach(sinon.restore);

      it('deve retornar um status 404', async () => {
        sinon.stub(Teams, 'findByPk').resolves(null);
        const httpResponse = await chai
          .request(app)
          .get('/teams/1');

        expect(httpResponse.status).to.be.equal(404);
        expect(httpResponse.body).to.be.deep.equal({ message: 'Team not found' });
      });
    });
  
    describe('quando a requisição é feita com sucesso', () => {

      it('deve retornar um status 200', async () => {
        sinon.stub(Teams, 'findByPk').resolves(teams[0]);
        const httpResponse = await chai
          .request(app)
          .get('/teams/1');
  
        expect(httpResponse.status).to.be.equal(200);
        expect(httpResponse.body).to.deep.equal(teams[0]);
      });
    });
  });
})
