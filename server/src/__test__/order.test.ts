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

describe('Delete /api/v1/admin/order', () => {
  test('success delete order ', (done) => {
    supertest(app)
      .delete('/api/v1/admin/order')
      .set('Cookie', [`token=${process.env.ADMIN}`])
      .send({
        id: 1,
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Order Deleted Successfully !');
        return done();
      });
  });
});

describe('Patch /api/v1/admin/order', () => {
  test('success edit order ', (done) => {
    supertest(app)
      .patch('/api/v1/admin/order')
      .set('Cookie', [`token=${process.env.ADMIN}`])
      .send({
        id: 1,
        status: 'rejected',
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Order Updated Successfully !');
        return done();
      });
  });
});

describe('Patch /api/v1/admin/order', () => {
  test('not found order id ', (done) => {
    supertest(app)
      .patch('/api/v1/admin/order')
      .set('Cookie', [`token=${process.env.ADMIN}`])
      .send({
        id: 900,
        status: 'rejected',
      })
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Order Not found !');
        return done();
      });
  });
});

describe('Patch /api/v1/admin/order', () => {
  test('Unauthorized admin ', (done) => {
    supertest(app)
      .patch('/api/v1/admin/order')
      .send({
        id: 1,
        status: 'rejected',
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

describe('Patch /api/v1/admin/order', () => {
  test('Validation error', (done) => {
    supertest(app)
      .patch('/api/v1/admin/order')
      .set('Cookie', [`token=${process.env.ADMIN}`])
      .send({
        id: 1,
        status: 44,
      })
      .expect(422)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body).toBe('"status" must be a string');
        return done();
      });
  });
});

afterAll(() => {
  sequelize.close();
});
