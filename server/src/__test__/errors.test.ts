/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
import supertest from 'supertest';
import app from '../app';

describe('Get /gdfgjdfgkdfgkdgds', () => {
  test("should return { status: 404, msg: 'Not Found' }", (done) => {
    const resp = { status: 404, msg: 'Not Found' };
    supertest(app)
      .get('/api/v1/gdfgjdfgkdfgkdgds')
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        expect(JSON.parse(res.text)).toEqual(resp);
        return done();
      });
  });
});
