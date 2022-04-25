/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
import supertest from 'supertest';
import sequelize from '../database/config/connection';
import app from '../app';
import sync from '../database/sync';

beforeAll(() => sync());

describe('POST /api/v1/auth/admin/product', () => {
  test('success add product', (done) => {
    supertest(app)
      .post('/api/v1/auth/admin/product')
      .send({
        name: 'product test',
        imageUrl: 'image url product test',
        price: 20,
        details: 'details test',
        categoryId: '2',
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).toBe('Product Added Successfully !');
        return done();
      });
  });
});
afterAll(() => {
  sequelize.close();
});
