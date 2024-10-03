const seed = require('../src/db/seeds/seed');
const data = require('../src/db/data/test-data/index');
const db = require('../src/db/connection');
const request = require('supertest');
const app = require('../src/app');

beforeEach(() => {
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
    test('DELETE:204 deletes the given goal by goal_id', () => {
      return request(app).delete('/api/goals/1').expect(204);
    });
    test('DELETE 404 responds with an appropriate status and error message when given a non-existent id', () => {
      return request(app)
        .delete('/api/goals/999')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe('Not found');
        });
    });
    test('DELETE:400 responds with an appropriate status and error message when given an invalid id', () => {
      return request(app)
        .delete('/api/goals/not-an-id')
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe('Bad request');
        });
    });
    test('PATCH:200 adds or subtracts from the amount_saved property ', () => {
      const newAmount = {
        inc_amount_saved: 10,
      };
      return request(app)
        .patch('/api/goals/1')
        .send(newAmount)
        .expect(200)
        .then(({ body }) => {
          expect(body.updatedGoal.amount_saved).toBe('60.00');
          expect(body.updatedGoal.target_amount).toBe('150.00');
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
              category: expect.any(String),
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
    test('200 sends an array of recurring transaction objects', () => {
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
              category: expect.any(String),
              essential: expect.any(Boolean),
            });
          });
        });
    });
    test('POST:201 inserts a new recurring transaction to the db and sends the new recurring transaction back to the client', () => {
      const newRecurringTransaction = {
        name: 'PS Plus',
        amount: 15,
        category_id: 3,
        essential: false,
        is_credit: false,
        date_due: null,
        is_active: true,
      };
      return request(app)
        .post('/api/recurring_transactions')
        .send(newRecurringTransaction)
        .expect(201)
        .then(({ body }) => {
          expect(body.recTransaction).toEqual(
            expect.objectContaining({
              transaction_id: expect.any(Number),
              user_id: 1,
              amount: '15.00',
              name: 'PS Plus',
              category_id: 3,
              essential: false,
              is_credit: false,
              date_due: null,
              is_active: true,
            })
          );
        });
    });
    test('PATCH:200 adds or subtracts from the amount property ', () => {
      const newRecurringAmount = {
        inc_amount: -100,
      };
      return request(app)
        .patch('/api/recurring_transactions/1')
        .send(newRecurringAmount)
        .expect(200)
        .then(({ body }) => {
          expect(body.updatedAmount.amount).toBe('600.00');
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
  describe('/api/reports', () => {
    test('200: sends monthly reports data', () => {
      return request(app)
        .get('/api/reports/october')
        .expect(200)
        .then(({ body }) => {
          expect(body.reports).toMatchObject({
            spentVsSaved: {
              spending: 960,
              saved: 1440,
            },
            essentialVsNonEssential: {
              essential: 950,
              nonEssential: 10,
            },
            spendingByCategory: {
              utilities: 250,
              food: 0,
              entertainment: 10,
              transportation: 0,
              housing: 700,
              other: 0,
              health: 0,
              childcare: 0,
              clothing: 0,
              groceries: 0,
              'animal care': 0,
            },
            dailyBalances: {
              'Oct 1': {
                balance: 1450,
                transactionNames: ['energy', 'mortgage'],
              },
              'Oct 3': {
                balance: 1440,
                transactionNames: ['movie'],
              },
            },
          });
        });
    });
  });
  describe('/api', () => {
    test('200: serves up a json representation of all the available endpoints of the api', () => {
      return request(app)
        .get('/api')
        .expect(200)
        .then(({ body }) => {
          expect(body.endpoint).toMatchObject({
            'GET /api/categories': expect.any(Object),
            'GET /api/goals': expect.any(Object),
            'POST /api/goals': expect.any(Object),
            'POST /api/ledger': expect.any(Object),
            'GET /api/recurring_transactions': expect.any(Object),
            'POST /api/recurring_transactions': expect.any(Object),
            'GET /api/overview': expect.any(Object),
            'GET /api/budget': expect.any(Object),
            'GET /api/reports': expect.any(Object),
            'PATCH /api/recurring_transactions': expect.any(Object),
            'DELETE /api/goals': expect.any(Object),
          });
        });
    });
  });
});
