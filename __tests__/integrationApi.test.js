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
});
