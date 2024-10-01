const seed = require('../src/db/seeds/seed');
const data = require('../src/db/data/test-data/index');
const db = require('../src/db/connection');
const request = require('supertest');
const app = require('../src/MVC/app');

beforeAll(() => {
  return seed(data);
});
afterAll(() => {
  return db.end();
});

describe('BudgetWise API', () => {
  //user test
  describe('api/users', () => {
    test('200,POST, AUTH, returns an object with a list of users as value', () => {
      const requestBody = { username: 'username', password: 'password' };
      return request(app)
        .post('/api/users/auth')
        .send(requestBody)
        .expect(200)
        .then(({ body }) => {
          expect(body).toHaveProperty('username', expect.any(String));
          // edit the user auth in future
        });
    });
  });
  // ADD MORE TESTS !!!!!!!!!!!!!!!!!!!
  describe('/api/categories', () => {
    test('200 sends an array of category objects', () => {
      return request(app)
        .get('/api/categories')
        .expect(200)
        .then(({ body }) => {
          expect(body.categories.length === 12).toBe(true);
          body.categories.forEach((category) => {
            expect(category).toMatchObject({
              name: expect.any(String),
            });
          });
        });
    });
  });
  // ADD MORE TESTS !!!!!!!!!!!!!!!!!!!
  describe('/api/goals', () => {
    test('200 sends an array of goals objects', () => {
      return request(app)
        .get('/api/goals')
        .expect(200)
        .then(({ body }) => {
          expect(body.goals.length === 2).toBe(true);
          body.goals.forEach((goal) => {
            expect(goal).toMatchObject({
              user_id: expect.any(Number),
              name: expect.any(String),
              target_amount: expect.any(String),
              amount_saved: expect.any(String),
            });
          });
        });
    });
  });
  describe('/api/ledger', () => {
    test('200 sends an array of ledger objects', () => {
      return request(app)
        .get('/api/ledger')
        .expect(200)
        .then(({ body }) => {
          expect(body.ledgers.length === 4).toBe(true);
          body.ledgers.forEach((ledger) => {
            expect(ledger).toMatchObject({
              created_at: expect.any(String),
              user_id: expect.any(Number),
              name: expect.any(String),
              category_id: expect.any(Number),
              essential: expect.any(Boolean),
            });
          });
        });
    });
  });
  describe('/api/recurring_transactions', () => {
    test('200 sends an array of ledger objects', () => {
      return request(app)
        .get('/api/recurring_transactions')
        .expect(200)
        .then(({ body }) => {
          expect(body.recurring_transactions.length === 3).toBe(true);
          body.recurring_transactions.forEach((transaction) => {
            expect(transaction).toMatchObject({
              user_id: expect.any(Number),
              name: expect.any(String),
              amount: expect.any(String),
              category_id: expect.any(Number),
              essential: expect.any(Boolean),
            });
          });
        });
    });
  });
  describe('/api/overview', () => {
    test('200 sends an object containing derived financial info', () => {
      return request(app)
        .get('/api/overview')
        .expect(200)
        .then(({ body }) => {
          expect(body.overview).toMatchObject({
            income: expect.any(Number),
            monthlyBills: expect.any(Number),
            spending: expect.any(Number),
            remainingBalance: expect.any(Number),
            totalGoalsProgress: expect.any(Number),
            totalGoalsTarget: expect.any(Number),
          });
        });
    });
  });
  describe('/api/budget', () => {
    test('200 sends an object with transactions divided into essential and non-essential', () => {
      return request(app)
        .get('/api/budget')
        .expect(200)
        .then(({ body }) => {
          expect(body.transactions).toMatchObject({
            essential: expect.any(Array),
            nonEssential: expect.any(Array),
          });
        });
    });
  });
  // describe('/api/stats', () => {
  //   test('200: sends annual transaction data', () => {
  //     return request(app).get('/api/stats').expect(200).then(({body}) => {
  //       expect(body.stats).toMatchObject({

  //       })
  //     })
  //   });
  // });
});
