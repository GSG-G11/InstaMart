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
describe('Patch /api/v1/admin/product', () => {
  test('success edit product ', (done) => {
    supertest(app)
      .patch('/api/v1/admin/product')
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
describe('Patch /api/v1/admin/product', () => {
  test('Unauthorized admin ', (done) => {
    supertest(app)
      .patch('/api/v1/admin/product')

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
describe('Patch /api/v1/admin/product', () => {
  test('Validation error', (done) => {
    supertest(app)
      .patch('/api/v1/admin/product')
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
describe('/api/v1/categories/1/products', () => {
  test('should success when request exist product', (done) => {
    supertest(app)
      .get('/api/v1/categories/1/products')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(JSON.parse(res.text).data.length).toBeGreaterThan(0);
        return done();
      });
  });
});

describe('/api/v1/categories/0/products', () => {
  test('should success when request exist product', (done) => {
    supertest(app)
      .get('/api/v1/categories/0/products')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(JSON.parse(res.text).data.length).toEqual(0);
        return done();
      });
  });
});
describe('/api/v1/categories/test/products', () => {
  test('should success when request exist product', (done) => {
    supertest(app)
      .get('/api/v1/categories/test/products')
      .expect(500)
      .end(() => done());
  });
});

describe('Delete /api/v1/admin/product', () => {
  test('success delete product ', (done) => {
    supertest(app)
      .delete('/api/v1/admin/product')
      .set('Cookie', [`token=${process.env.ADMIN}`])
      .send({
        id: 1,
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Product Deleted Successfully !');
        return done();
      });
  });
});

describe('Delete /api/v1/admin/product', () => {
  test('Unauthorized admin ', (done) => {
    supertest(app)
      .delete('/api/v1/admin/product')
      .send({
        id: 2,
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

describe('Delete /api/v1/admin/product', () => {
  test('server error ', (done) => {
    supertest(app)
      .delete('/api/v1/admin/product')
      .set('Cookie', [`token=${process.env.ADMIN}`])
      .send({
        id: 's',
      })
      .expect(500)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.msg).toBe('server error');
        return done();
      });
  });
});

afterAll(() => {
  sequelize.close();
});
