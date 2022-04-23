/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
import supertest from 'supertest';
import app from '../app';
import sync from '../database/sync';

beforeAll(() => sync());

describe('POST /api/v1/signup', () => {
  test('success sign up', (done) => {
    supertest(app)
      .post('/api/v1/signup')
      .send({
        name: 'yosra',
        password: 'password',
        confirmPassword: 'password',
        email: 'yosra@gmail.com',
        address: 'gaza',
        mobile: '0594121212',
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        const token = res.header['set-cookie'][0].split('=')[0];
        expect(token).toBe('token');
        expect(res.body.success).toBe(true);
        return done();
      });
  });
});
describe('validation error', () => {
  test('validation error, must be a valid email', (done) => {
    supertest(app)
      .post('/api/v1/signup')
      .send({
        name: 'yosra',
        password: 'password',
        confirmPassword: 'password',
        email: 'yosragmail.com',
        address: 'gaza',
        mobile: '0594121212',
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        // eslint-disable-next-line no-useless-escape
        expect(res.body).toBe('\"email\" must be a valid email');
        return done();
      });
  });
});
describe('sign up with email is already exists', () => {
  test('email is already exists', (done) => {
    supertest(app)
      .post('/api/v1/signup')
      .send({
        name: 'yosra',
        password: 'password',
        confirmPassword: 'password',
        email: 'yosra@gmail.com',
        address: 'gaza',
        mobile: '0594121212',
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).toBe('Email is already exist !');
        return done();
      });
  });
});

describe('Post /api/v1/logout', () => {
  test("should return { status: 200, msg: 'logged out successfully !' }", (done) => {
    const resp = { status: 200, msg: 'logged out successfully !' };
    supertest(app)
      .post('/api/v1/logout')
      .send(undefined)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(JSON.parse(res.text)).toEqual(resp);
        return done();
      });
  });
});

describe('GET /api/v1/auth/user', () => {
  test("should return { status: 401, msg: 'Unauthorized' } when no token cookie", (done) => {
    const resp = { status: 401, msg: 'Unauthorized' };
    supertest(app)
      .get('/api/v1/auth/user')
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        expect(JSON.parse(res.text)).toEqual(resp);
        return done();
      });
  });

  test("should return { status: 400, msg: 'Bad Request' } when invalid token cookie", (done) => {
    const resp = { status: 400, msg: 'Bad Request' };
    supertest(app)
      .get('/api/v1/auth/user')
      .expect(400)
      .set('Cookie', ['token=invalid'])
      .end((err, res) => {
        if (err) return done(err);
        expect(JSON.parse(res.text)).toEqual(resp);
        return done();
      });
  });

  test('should return {"id":1,"isAdmin":false,"name":"Ibrahim","iat":1650669095} when valid token cookie', (done) => {
    const resp = {
      id: 1, isAdmin: false, name: 'Ibrahim', iat: 1650669095,
    };
    supertest(app)
      .get('/api/v1/auth/user')
      .set('Cookie', ['token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNBZG1pbiI6ZmFsc2UsIm5hbWUiOiJJYnJhaGltIiwiaWF0IjoxNjUwNjY5MDk1fQ.7lzrri5_70Xlm5djI-bu9HPSI7yTnT-yP813FNXZOBk'])
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(JSON.parse(res.text)).toEqual(resp);
        return done();
      });
  });
});
