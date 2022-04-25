/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
import supertest from 'supertest';
import sequelize from '../database/config/connection';
import app from '../app';
import sync from '../database/sync';
import buildFakeData from '../database/fakeData/buildFakeData';

beforeAll(async () => {
  await sync();
  await buildFakeData();
});

describe('POST /api/v1/auth/admin/product', () => {
  test('success add product', (done) => {
    supertest(app)
      .post('/api/v1/auth/admin/product')
      .set('Cookie', ['token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNBZG1pbiI6ZmFsc2UsIm5hbWUiOiJJYnJhaGltIiwiaWF0IjoxNjUwNjY5MDk1fQ.7lzrri5_70Xlm5djI-bu9HPSI7yTnT-yP813FNXZOBk'])
      .send({
        name: 'product test',
        imageUrl: 'image url product test',
        price: 20,
        details: 'details test',
        categoryId: 2,
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Product Added Successfully !');
        return done();
      });
  });
});
afterAll(() => {
  sequelize.close();
});
