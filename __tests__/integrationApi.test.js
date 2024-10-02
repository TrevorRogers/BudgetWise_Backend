const seed = require('../src/db/seeds/seed');
const data = require('../src/db/data/test-data/index');
const db = require('../src/db/connection');
const request = require('supertest');
const app = require('../src/app');

beforeAll(() => {
  return seed(data);
});
afterAll(() => {
  return db.end();
});

describe('BudgetWise API', () => {
  describe('api/users/auth', () => {
    test('POST: 200, returns a logged in username', () => {
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
    test('POST:201 inserts a new goal to the db and sends the new goal back to the client', () => {
      const newGoal = {
        name: 'Travel',
        target_amount: 100,
        amount_saved: 25,
      };
      return request(app)
        .post('/api/goals')
        .send(newGoal)
        .expect(201)
        .then(({ body }) => {
          expect(body.goal).toEqual(
            expect.objectContaining({
              goal_id: expect.any(Number),
              user_id: 1,
              name: 'Travel',
              target_amount: '100.00',
              amount_saved: '25.00',
              date_due: null,
            })
          );
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
              amount: expect.any(String),
            });
          });
        });
    });
    test('POST:201 inserts a new ledger to the db and sends the new ledger back to the client', () => {
      const newLedger = {
        name: 'Nandos',
        category_id: 2,
        essential: false,
        amount: 15.35,
        is_credit: false,
      };
      return request(app)
        .post('/api/ledger')
        .send(newLedger)
        .expect(201)
        .then(({ body }) => {
          expect(body.transaction).toEqual(
            expect.objectContaining({
              ledger_id: expect.any(Number),
              created_at: expect.any(String),
              user_id: 1,
              name: 'Nandos',
              category_id: 2,
              essential: false,
              is_credit: false,
              amount: '15.35',
              transaction_id: null,
            })
          );
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
    test('POST:201 inserts a new recurring transaction to the db and sends the new recurring transaction back to the client', () => {
      const newRecurringTransaction = {
        user_id: 1,
        name: 'PS Plus',
        amount: 15,
        category_id: 3,
        essential: false,
      };
      return request(app)
        .post('/api/recurring_transaction')
        .send(newRecurringTransaction)
        .expect(201)
        .then(({ body }) => {
          expect(body.recurring_transactions.user_id).toBe(1);
          expect(body.recurring_transactions.name).toBe('PS Plus');
          expect(body.recurring_transactions.amount).toBe(15);
          expect(body.recurring_transactions.category_id).toBe(3);
          expect(body.recurring_transactions.essential).toBe(false);
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
          expect(body.transactions.essential).toBeSortedBy('created_at', {
            descending: true,
          });
          expect(body.transactions.nonEssential).toBeSortedBy('created_at', {
            descending: true,
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
