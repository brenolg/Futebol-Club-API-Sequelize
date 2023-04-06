import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http') ;
import { app } from '../app';
import { invalidEmail, loginNoEmail, role, user, validLogin} from './mocks/login';
import { token } from './mocks/token';
import Users from '../database/models/users';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken'
import { verifyToken } from '../auth/authFuncs';


chai.use(chaiHttp);
const {expect} = chai

describe('Testes da rota /login', () => {

  afterEach(() => {sinon.restore()});

  describe('POST /login', () => {

    describe('Caso o email não for informado', () => {

      it('deve retornar um status 400', async () => {
        const httpResponse = await chai
          .request(app)
          .post('/login')
          .send(loginNoEmail);

        expect(httpResponse.status).to.be.equal(400);
        expect(httpResponse.body).to.be.deep.equal({ message: "All fields must be filled" });
      });
    });

    describe('Caso o email seja invalido', () => {

      it('deve retornar um status 401', async () => {
        const httpResponse = await chai
          .request(app)
          .post('/login')
          .send(invalidEmail);

        expect(httpResponse.status).to.be.equal(401);
        expect(httpResponse.body).to.be.deep.equal({ message: "Invalid email or password" });
      });
    });

    describe('Quando a requisição é feita com sucesso', () => {

      it('deve retornar um status 200 e token', async () => {
        sinon.stub(Users, 'findOne').resolves(user);
        sinon.stub(bcrypt, 'compareSync').resolves(true);
        sinon.mock(jwt).expects('sign').returns(token);


        const httpResponse = await chai
          .request(app)
          .post('/login')
          .send(validLogin);

        expect(httpResponse.status).to.be.equal(200);
        expect(httpResponse.body).to.deep.equal({token});
      });
    });
  });

  describe('GET /login/role', () => {

    afterEach(() => {sinon.restore()});

    describe('Sem authorization', () => {

      it('deve retornar um status 401', async () => {
        sinon.stub(Users, 'findOne').resolves(user);
        sinon.stub(bcrypt, 'compareSync').resolves(true);
        sinon.mock(jwt).expects('sign').returns({token: ''});


        const httpResponse = await chai
          .request(app)
          .get('/login/role')
          .send(role);

        expect(httpResponse.status).to.be.equal(401);
        expect(httpResponse.body).to.deep.equal({ message: "Token not found" });
      }); 
    });

    describe('Quando a requisição é feita com sucesso', () => {

      it('deve retornar um status 200', async () => {
        const httpResponse = await chai
          .request(app)
          .get('/login/role')
          .send(role)
          .set('Authorization', token.token);

        expect(httpResponse.status).to.be.equal(200);
        expect(httpResponse.body).to.deep.equal(role);
      }); 
    });
  });
});
