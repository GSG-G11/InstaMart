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

afterAll(() => {
  sequelize.close();
});
