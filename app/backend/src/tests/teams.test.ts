import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http') ;
import { app } from '../app';
import Teams from '../database/models/teams';
import teams from './mocks/teams';

chai.use(chaiHttp);
const {expect} = chai

describe('Testando a rota /teams', () => {

  afterEach(sinon.restore);

  describe('GET /teams', () => {
    describe('Quando a requisição é feita com sucesso', () => {

      it('deve retornar um status 200', async () => {
        sinon.stub(Teams, 'findAll').resolves(teams);
        const httpResponse = await chai
          .request(app)
          .get('/teams/1');
  
          expect(httpResponse.status).to.be.equal(200);
          expect(httpResponse.body).to.be.deep.equal(teams);
    })

    })
  })

  describe('GET /teams/:id', () => {

    describe('Caso o id informado não for encontrado', () => {

      it('deve retornar um status 404', async () => {
        sinon.stub(Teams, 'findByPk').resolves(null);
        const httpResponse = await chai
          .request(app)
          .get('/teams/1');

        expect(httpResponse.status).to.be.equal(404);
        expect(httpResponse.body).to.be.deep.equal({ message: 'Team not found' });
      });
    });
  
    describe('Quando a requisição é feita com sucesso', () => {

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
