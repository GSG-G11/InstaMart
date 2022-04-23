/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
import supertest from 'supertest';
import app from '../src/app';

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
