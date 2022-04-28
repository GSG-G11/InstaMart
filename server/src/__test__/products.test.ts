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

describe('POST /api/v1/admin/product', () => {
  test('success add product', (done) => {
    supertest(app)
      .post('/api/v1/admin/product')
      .set('Cookie', [`token=${process.env.ADMIN}`])
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
describe('POST /api/v1/admin/product', () => {
  test('test error validation, not found price', (done) => {
    supertest(app)
      .post('/api/v1/admin/product')
      .set('Cookie', [`token=${process.env.ADMIN}`])
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

describe('/api/v1/products/1', () => {
  test('should success when request exist product', (done) => {
    supertest(app)
      .get('/api/v1/products/1')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(JSON.parse(res.text).success).toEqual(true);
        return done();
      });
  });
});

describe('/api/v1/products/200', () => {
  test('should failed when product id not found', (done) => {
    supertest(app)
      .get('/api/v1/products/200')
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        expect(JSON.parse(res.text).success).toEqual(false);
        return done();
      });
  });
});

describe('/api/v1/categories  Test', () => {
  test('should return {status:200,data:[...]}', (done) => {
    const resp = {
      status: 200,
      data: [
        {
          id: 1,
          name: 'Food',
          imageUrl: 'https://cdn-icons-png.flaticon.com/512/541/541836.png',
        },
        {
          id: 2,
          name: 'Drinks',
          imageUrl: 'https://cdn-icons-png.flaticon.com/512/3126/3126588.png',
        },
        {
          id: 3,
          name: 'Vegetables',
          imageUrl: 'https://cdn-icons-png.flaticon.com/512/2329/2329903.png',
        },
        {
          id: 4,
          name: 'Fruits',
          imageUrl: 'https://cdn-icons-png.flaticon.com/512/3081/3081887.png',
        },
      ],
    };
    supertest(app)
      .get('/api/v1/categories')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(JSON.parse(res.text)).toEqual(resp);
        return done();
      });
  });
});

afterAll(() => {
  sequelize.close();
});
