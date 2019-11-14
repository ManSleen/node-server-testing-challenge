const request = require("supertest");

const db = require("../data/db-config.js");
const server = require("../server.js");

describe("server", () => {
  beforeEach(async () => {
    // guarantees that the table is cleaned out before any of the tests run
    await db("users").truncate();
  });

  it('tests are running with DB_ENV set as "testing"', () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  describe("GET /", () => {
    it("returns 200 OK", () => {
      return request(server)
        .get("/")
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
    it("should return a JSON object from the index route", () => {
      const expectedBody = { message: "API is up!" };
      return request(server)
        .get("/")
        .then(res => {
          expect(res.body).toEqual(expectedBody);
        });
    });
  });

  describe("User Router", () => {
    describe("GET /api/users", () => {
      it("returns 200 OK", () => {
        return request(server)
          .get("/api/users")
          .set(
            "Authorization",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6Im1pa2UudmFuc2xlZW4iLCJpYXQiOjE1NjY1MDkyODUsImV4cCI6MTU2NjUzODA4NX0.b7JdXwQBaURv6lJcxKynGtOI5oCSD9UvpvStbcZw55s"
          )
          .then(res => {
            expect(res.status).toBe(200);
          });
      });
    });
    describe("POST /api/users", () => {
      it("returns 201 and adds user", () => {
        return request(server)
          .post("/api/auth/register")
          .send({
            username: "johnDoeseph",
            password: "hooboy",
            department_id: 1,
            position_id: 1
          })
          .then(res => {
            expect(res.status).toBe(201);
          });
      });
    });
  });
});
