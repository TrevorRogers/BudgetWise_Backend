const seed = require("../src/db/seeds/seed");
const data = require("../src/db/data/test-data/index");
const db = require("../src/db/connection");
const request = require("supertest");
const app = require("../src/MVC/app");
beforeAll(() => {
  return seed(data);
});
afterAll(() => {
  return db.end();
});

describe("BudgetWise API", () => {
  //user test
  describe("api/users", () => {
    test("POST, AUTH, returns an object with a list of users as value", () => {
      const requestBody = { username: "username", password: "password" };
      return request(app)
        .post("/api/users/auth")
        .send(requestBody)
        .expect(200)
        .then(({ body }) => {
          expect(body).toHaveProperty("username", expect.any(String));
          // edit the user auth in future
        });
    });
  });
  describe("/api/categories", () => {
    test("200 sends an array of category objects", () => {
        return request(app)
            .get("api/categories")
            .expect(200)
            .then(({body})=> {
                expect(body.categories.length === 11).toBe(true)
                body.categories.forEach((category) => {
                    expect(category).toMatchObject({
                        name: expect.any(String)
                    })
                })
            })
    })
})
describe("/api/goals", () => {
    test("200 sends an array of goals objects", () => {
        return request(app)
            .get("api/goals")
            .expect(200)
            .then(({body})=> {
                expect(body.goals.length === 2).toBe(true)
                body.goals.forEach((goal) => {
                    expect(goal).toMatchObject({
                        user_id: expect.any(Number), name: expect.any(String), target_amount: expect.any(Number), amount_saved: expect.any(Number)
                    })
                })
            })
    })
})
describe("/api/ledger", () => {
    test("200 sends an array of ledger objects", () => {
        return request(app)
            .get("api/ledger")
            .expect(200)
            .then(({body})=> {
                expect(body.goals.length === 9).toBe(true)
                body.ledgers.forEach((ledger) => {
                    expect(ledger).toMatchObject({
                        created_at: expect.any(Number),
                        user_id: expect.any(Number),
                        name: expect.any(String), 
                        category_id: expect.any(Number), 
                        essential: expect.any(Boolean)
                    })
                })
            })
    })
})
describe("/api/recurring_transactions", () => {
    test("200 sends an array of ledger objects", () => {
        return request(app)
            .get("api/recurring_transactions")
            .expect(200)
            .then(({body})=> {
                expect(body.recurring_transactions.length === 9).toBe(true)
                body.recurring_transactions.forEach((transaction) => {
                    expect(transaction).toMatchObject({
                        user_id: expect.any(Number),
                        name: expect.any(String),
                        amount: expect.any(Number), 
                        category_id: expect.any(Number), 
                        essential: expect.any(Boolean)
                    })
                })
            })
    })
})
});
