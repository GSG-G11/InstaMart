/* eslint-disable no-useless-escape */
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
      .set('Cookie', [`token=${process.env.TOKEN}`])
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
describe('POST /api/v1/auth/admin/product', () => {
  test('test error validation, not found price', (done) => {
    supertest(app)
      .post('/api/v1/auth/admin/product')
      .set('Cookie', [`token=${process.env.TOKEN}`])
      .send({
        name: 'product test',
        imageUrl: 'image url product test',
        details: 'details test',
        categoryId: 2,
      })
      .expect(422)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        // eslint-disable-next-line no-useless-escape
        expect(res.body).toBe('\"price\" is required');
        return done();
      });
  });
});
describe('Patch /api/v1/auth/admin/product', () => {
  test('success edit product ', (done) => {
    supertest(app)
      .patch('/api/v1/auth/admin/product')
      .set('Cookie', [`token=${process.env.ADMIN}`])
      .send({
        id: 2,
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
        expect(res.body.message).toBe('Product Updated Successfully !');
        return done();
      });
  });
});
describe('Patch /api/v1/auth/admin/product', () => {
  test('Unauthorized admin ', (done) => {
    supertest(app)
      .patch('/api/v1/auth/admin/product')

      .send({
        id: 2,
        name: 'product test',
        imageUrl: 'image url product test',
        price: 20,
        details: 'details test',
        categoryId: 2,
      })
      .expect(401)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.msg).toBe('Unauthorized');
        return done();
      });
  });
});
describe('Patch /api/v1/auth/admin/product', () => {
  test('Validation error', (done) => {
    supertest(app)
      .patch('/api/v1/auth/admin/product')
      .set('Cookie', [`token=${process.env.ADMIN}`])
      .send({
        id: 2,
        name: 'product test',
        imageUrl: 'image url product test',
        price: 20,
        details: 'details test',
        categoryId: 'xsdf',
      })
      .expect(422)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body).toBe('"categoryId" must be a number');
        return done();
      });
  });
});
afterAll(() => {
  sequelize.close();
});
